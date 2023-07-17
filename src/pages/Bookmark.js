import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from "react-dom";
import ListItem from "../components/ListItem";
import Filter from "../components/Filter";
import Modal from "../components/Modal";

function Bookmark() {

  // bookmark
  const [bookmark, setBookmark] = useState([]);

  // localStorage bookmark 확인
  useEffect(() => {
    if (localStorage.getItem("bookmark")) {
      setBookmark(JSON.parse(localStorage.getItem("bookmark")))
    }
  }, [])

  useEffect(() => {
    console.log("bookmark", bookmark);

    if (bookmark.length > 0) {
      localStorage.setItem("bookmark", JSON.stringify(bookmark))
    } else {
      localStorage.removeItem("bookmark")
    }

  }, [bookmark])

  // filter
  const [filteredList, setFilteredList] = useState(bookmark);
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
    setFilteredList(bookmark);
  }, [bookmark]);

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
    setFilteredList(bookmark);

    if (type === "All") {
      // console.log("👀 카테고리 All");
      setFilteredList(bookmark);
      setCurrentProducts(filteredList.slice(0, 10 * page));
    }

    if (type !== "All") {
      // console.log("👀 카테고리 All 아님");
      // console.log("🚀 currentProducts", page, currentProducts );
      const filteredData = bookmark.filter((list) => list.type === type);
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

  // bookmark

  // const isBookmarkHandler = (targetId) => {
  //   const setIsBookmark = mainProducts.map((product) => {      
  //     return product.id === targetId ? { ...product, isBookmark: !product.isBookmark } : product
  //   })
  //   setMainProducts(setIsBookmark);
  //   console.log(mainProducts)
  // }

  const bookmarkHandler = (targetId) => {
    // console.log("targetId", targetId)

    // isBookmark handler (isBookmark가 true면 false로, false면 true로.)
    // 필요한 코드인가..?
    // isBookmarkHandler(targetId)
   

    if (bookmark.find((list) => list.id === targetId)) {
      // console.log("북마크에 이미 있는 항목으로 북마크에서 제거", targetId)
      removeBookmark(targetId)
    }
  }

  const removeBookmark = (targetId) => {
    // bookmark를 돌며 targetId와 id가 같지 않은 값들만 모아서
    // bookmark를 다시 생성한다.
    const target = bookmark.filter((product) => product.id !== targetId);
    console.log("target", target)
    setBookmark(target)

  }
  


  return (
    <>
      <main>
        <Filter onFilter={ClickFilterHandler}/>
        <section>
          <ul className="listItem">
            { currentProducts.map((list) => (
              <ListItem
                key={list.id}
                {...list}
                openModal={openModalHandler}
                bookmarkHandler={bookmarkHandler}
              />
            )) }
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
  )
}

export default Bookmark;