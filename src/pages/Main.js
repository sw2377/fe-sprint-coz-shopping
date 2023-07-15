import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import useFetch from "../hooks/useFetch";
import ListItem from "../components/ListItem";
import Modal from "../components/Modal";
import "./Main.css";

function Main({ bookmark, setBookmark }) {

  const products = useFetch("http://cozshopping.codestates-seb.link/api/v1/products?count=4");

  // Modal Control
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({
    name: "",
    image: "",
  });


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
  // };

  // const removeBookmarkHandler = (star, targetId) => {
  //   const bookmarkData = bookmark.filter((list) => list.id !== targetId);
  //   setBookmark(bookmarkData);
  // };

  return (
    <main>
      <section>
        <h2>상품 리스트</h2>
        <ul className="listItem">
          {products.map((list) => (
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
      <section>
        <h2>북마크 리스트</h2>
        {/* <div>🥲 북마크 된 아이템이 없습니다! 👀 </div> */}
        <ul className="listItem">
          {bookmark.slice(0, 4).map((list) => (
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

      {isOpen &&
        createPortal(
          <Modal modalData={modalData} closeModal={closeModalHandler} />,
          document.getElementById("modal")
        )}
    </main>
  );
}

export default Main;
