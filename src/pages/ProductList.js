import { useState, useEffect, useRef, useCallback } from "react";
import useFetch from "../hooks/useFetch";
import ListItem from "../components/ListItem";
import Filter from "../components/Filter";
import "./ProductList.css";

function ProductList() {
  const products = useFetch(
    "http://cozshopping.codestates-seb.link/api/v1/products"
  );

  const [listProducts, setListProducts] = useState([]);
  // console.log("product list page", listProducts)

  useEffect(() => {
    // bookmark와 products를 비교해서 같은 값은 isBookmark: true로 설정한 후 listProducts로 set한다.
    // bookmark state의 id와 listProducts의 id가 같은걸 찾고,
    // listProducts의 isBookmark: true로 바꾼다.
    if (products.length > 0 && bookmark.length > 0) {
      // console.log("products", products, "bookmark", bookmark)

      for (let i = 0; i < bookmark.length; i++) {
        for (let j = 0; j < products.length; j++) {
          if (bookmark[i].id === products[j].id) {
            // console.log(products[j])
            products[j] = { ...products[j], isBookmark: true };
            // console.log(products[j])
          }
        }
      }
    }

    setListProducts(products);
  }, [products]);

  // bookmark
  const [bookmark, setBookmark] = useState([]);

  // localStorage bookmark 확인
  useEffect(() => {
    if (localStorage.getItem("bookmark")) {
      setBookmark(JSON.parse(localStorage.getItem("bookmark")));
    }
  }, []);

  useEffect(() => {
    // console.log("bookmark", bookmark);

    if (bookmark.length > 0) {
      localStorage.setItem("bookmark", JSON.stringify(bookmark));
    } else {
      localStorage.removeItem("bookmark");
    }
  }, [bookmark]);

  // filter
  const [filteredList, setFilteredList] = useState(products);
  const [type, setType] = useState("All");

  // infinite scroll
  const [currentProducts, setCurrentProducts] = useState([]);
  const [page, setPage] = useState(1);
  const bottom = useRef(null);

  // loading
  const [isLoading, setIsLoading] = useState(true);
  // console.log("🚀 currentProducts", page, currentProducts );

  useEffect(() => {
    // console.log("USE EFFECT 1. productList");
    setFilteredList(products);
  }, [products]);

  useEffect(() => {
    // console.log("USE EFFECT 2. filteredList");
    setCurrentProducts(filteredList.slice(0, 10 * page));
  }, [filteredList]);

  useEffect(() => {
    // console.log("USE EFFECT 3. TYPE");
    getProductList();
  }, [type]);

  // filter
  const getProductList = () => {
    setFilteredList(products);

    if (type === "All") {
      // console.log("👀 카테고리 All");
      setFilteredList(products);
      setCurrentProducts(filteredList.slice(0, 10 * page));
    }

    if (type !== "All") {
      // console.log("👀 카테고리 All 아님");
      // console.log("🚀 currentProducts", page, currentProducts );
      const filteredData = products.filter((list) => list.type === type);
      // console.log("🛰️ filteredData", filteredData );
      setPage(1);
      setFilteredList(filteredData);
      setCurrentProducts(filteredList.slice(0, 10 * page));
      // console.log("🚀 currentProducts", page, currentProducts );
    }

    setIsLoading(false);
  };

  const ClickFilterHandler = (type) => {
    // console.log("🛰️ typeTest", type)
    setType(type);
    getProductList();
  };

  // infinite scroll
  const renderNextPage = useCallback(() => {
    setIsLoading(true);

    if (page < 10) {
      setCurrentProducts(filteredList.slice(0, 10 * (page + 1)));
      setPage(page + 1);
    }

    setIsLoading(false);
  }, [page, filteredList]);

  useEffect(() => {
    if (bottom.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            // console.log("🚀 entries", entries);
            // console.log("🚀 currentProducts", currentProducts);
            renderNextPage();
          }
        },
        {
          threshold: 1,
        }
      );
      observer.observe(bottom.current);
      return () => observer.disconnect();
    }
  }, [renderNextPage]);

  // bookmark
  const isBookmarkHandler = (targetId) => {
    const setIsBookmark = listProducts.map((product) => {
      return product.id === targetId
        ? { ...product, isBookmark: !product.isBookmark }
        : product;
    });
    setListProducts(setIsBookmark);
    // console.log(listProducts)
  };

  const bookmarkHandler = (targetId) => {
    // console.log("targetId", targetId)

    // isBookmark handler (isBookmark가 true면 false로, false면 true로.)
    // 필요한 코드인가..?
    isBookmarkHandler(targetId);

    if (bookmark.find((list) => list.id === targetId)) {
      // console.log("북마크에 이미 있는 항목으로 북마크에서 제거", targetId)
      removeBookmark(targetId);
    } else {
      // console.log("북마크에 없는 항목으로 북마크에 추가", targetId)
      addBookmark(targetId);
    }
  };

  const addBookmark = (targetId) => {
    // mainProducts를 돌며 targetId와 id가 같은 값을 찾고
    // mainProducts.isBookmark를 true로 바꾸고,
    // bookmark에 넣는다.

    // const target = mainProducts.filter((product) => product.id === targetId)[0];
    const target = listProducts
      .map((product) => {
        return product.id === targetId
          ? { ...product, isBookmark: true }
          : product;
      })
      .filter((product) => product.id === targetId)[0];

    // console.log("target", target)
    setBookmark((prev) => [...prev, target]);
  };

  const removeBookmark = (targetId) => {
    // bookmark를 돌며 targetId와 id가 같지 않은 값들만 모아서
    // bookmark를 다시 생성한다.
    const target = bookmark.filter((product) => product.id !== targetId);
    // console.log("target", target)
    setBookmark(target);
  };

  return (
    <>
      <main>
        <Filter onFilter={ClickFilterHandler} />
        <section>
          <ul className="listItem">
            {currentProducts.map((list) => (
              <ListItem
                key={list.id}
                {...list}
                bookmarkHandler={bookmarkHandler}
              />
            ))}
          </ul>
        </section>
        {isLoading ? "loading..." : <div ref={bottom}></div>}
      </main>
    </>
  );
}

export default ProductList;
