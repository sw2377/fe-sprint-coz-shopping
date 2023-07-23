import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ReactComponent as Bookmark } from "../assets/icons/bookmarkIcon.svg";
import Modal from "./Modal";
import Toast from "./Toast";
import "./ListItem.css";

function ListItem({ openModal, bookmarkHandler, ...list }) {
  const [star, setStar] = useState(list.isBookmark);

  const [isToastShow, setIsToastShow] = useState(false);
  const [toastList, setToastList] = useState([]);
  let toastProperties = { id: list.id };


  // Modal
  const [isModal, setIsModal] = useState(false);
  const [modalData, setModalData] = useState({
    name: "",
    image: "",
    isBookmark: false,
  });

  const openModalHandler = (image, brandImg, title, brandName, isBookmark) => {
    setModalData({
      name: title || brandName,
      image: image || brandImg,
      isBookmark: isBookmark,
    });
    setIsModal(true);
  };

  const closeModalHandler = () => {
    setIsModal(false);
  };


  // bookmark
  const clickBookmarkHandler = (e) => {
    e.stopPropagation();
    setStar(!star);

    bookmarkHandler(list.id);

    // toast
    setToastList([...toastList, toastProperties]);
    setIsToastShow(true);
  };

  return (
    <li
      onClick={() =>
        openModalHandler(
          list.image_url,
          list.brand_image_url,
          list.title,
          list.brand_name,
          list.isBookmark
        )
      }
    >
      <div
        className="img"
        style={{
          backgroundImage:
            list.type === "Brand"
              ? `url("${list.brand_image_url}")`
              : `url("${list.image_url}")`,
        }}
      >
        {/* bookmark */}
        <div className="bookmark_icon" onClick={clickBookmarkHandler}>
          <Bookmark
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fillOpacity={star ? "1" : "0.8"}
            fill={star ? "#FFD361" : "#DFDFDF"}
          />
        </div>
      </div>

      {/* type별 조건부 렌더링 */}
      {list.type === "Product" && (
        <div className="desc flex">
          <span className="title">{list.title}</span>
          <div>
            <span className="discount_percentage">
              {list.discountPercentage}%
            </span>
            <span className="price">
              {Number(list.price).toLocaleString()}원
            </span>
          </div>
        </div>
      )}
      {list.type === "Category" && (
        <div className="desc">
          <span className="title"># {list.title}</span>
        </div>
      )}
      {list.type === "Exhibition" && (
        <div className="desc">
          <span className="title">{list.title}</span>
          <span className="sub_title">{list.sub_title}</span>
        </div>
      )}
      {list.type === "Brand" && (
        <div className="desc flex">
          <span className="title">{list.brand_name}</span>
          <div>
            <span className="follower">관심고객수</span>
            <span className="follower_number">
              {list.follower.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {isModal &&
        createPortal(
          <Modal modalData={modalData} setIsModal={setIsModal} closeModal={closeModalHandler} />,
          document.getElementById("modal-root")
        )}

      {isToastShow &&
        createPortal(
          <Toast
            toastList={toastList}
            setToastList={setToastList}
            setIsToastShow={setIsToastShow}
            star={star}
          />,
          document.getElementById("toast-root")
        )}
    </li>
  );
}

export default ListItem;
