import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import useFetch from "../hooks/useFetch";
import ListItem from "../components/ListItem";
import Filter from "../components/Filter";
import Modal from "../components/Modal";
import "./ProductList.css";

function ProductList() {

  const products = useFetch("http://cozshopping.codestates-seb.link/api/v1/products");

  // filter
  const [filteredList, setFilteredList] = useState(products);
  const [type, setType] = useState("All");

  // Modal
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({
    name: "",
    image: "",
  });

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

  // Modal
  const openModalHandler = (image, brandImg, title, brandName) => {
    console.log("🚀 OPEN MODAL!", image, brandImg, title, brandName);
    setModalData({
      name: title || brandName,
      image: image || brandImg,
    });
    setIsOpen(true);
  };

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  // Bookmark
  // const addBookmarkHandler = (star, targetId) => {
  //   const bookmarkData = productList.filter((list) => list.id === targetId);
  //   setBookmark((prev) => [...prev, bookmarkData[0]]);
  // }

  // const removeBookmarkHandler = (star, targetId) => {
  //   const bookmarkData = bookmark.filter((list) => list.id !== targetId);
  //   setBookmark(bookmarkData);
  // }

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
                openModal={openModalHandler}
                // addBookmark={addBookmarkHandler}
                // removeBookmark={removeBookmarkHandler}
              />
            ))}
          </ul>
        </section>
        {isLoading ? "loading..." : <div ref={bottom}>TEST: BOTTOM AREA</div>}
        {isOpen &&
          createPortal(
            <Modal modalData={modalData} closeModal={closeModalHandler} />,
            document.getElementById("modal")
          )}
      </main>
    </>
  );
}

export default ProductList;
