import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import ListItem from "../components/ListItem";
import "./Main.css";
import Toast from "../components/Toast";

function Main() {
  const products = useFetch(
    "http://cozshopping.codestates-seb.link/api/v1/products?count=4"
  );

  const [mainProducts, setMainProducts] = useState([]);

  useEffect(() => {
    // bookmark와 products를 비교해서 같은 값은 isBookmark: true로 설정한 후 mainProducts로 set한다.
    // bookmark state의 id와 mainProducts의 id가 같은걸 찾고,
    // mainProducts의 isBookmark: true로 바꾼다.
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

    setMainProducts(products);
  }, [products]);

  // bookmark
  const [bookmark, setBookmark] = useState([]);

  // 최초 렌더링시 localStorage bookmark 확인
  // 로컬스토리지에 bookmark가 있으면, bookmark state에 set한다.
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

  const isBookmarkHandler = (targetId) => {
    const setIsBookmark = mainProducts.map((product) => {
      return product.id === targetId
        ? { ...product, isBookmark: !product.isBookmark }
        : product;
    });
    setMainProducts(setIsBookmark);
    // console.log(mainProducts)
  };

  const bookmarkHandler = (targetId) => {
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

    const target = mainProducts
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
    console.log("target", target);
    setBookmark(target);
  };

  return (
    <main>
      <section>
        <h2>상품 리스트</h2>
        <ul className="listItem">
          {mainProducts.map((list) => (
            <ListItem
              key={list.id}
              {...list}
              bookmarkHandler={bookmarkHandler}
            />
          ))}
        </ul>
      </section>
      <section>
        <h2>북마크 리스트</h2>
        {bookmark.length > 0 ? (
          <ul className="listItem">
            {bookmark.slice(0, 4).map((list) => (
              <ListItem
                key={list.id}
                {...list}
                bookmarkHandler={bookmarkHandler}
              />
            ))}
          </ul>
        ) : (
          <div>
            🥲 북마크 된 아이템이 없습니다. 별을 클릭해 저장해 주세요! 👀
          </div>
        )}
      </section>
    </main>
  );
}

export default Main;
