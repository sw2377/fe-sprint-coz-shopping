import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import ListItem from '../components/ListItem';
import Filter from '../components/Filter';
import './ProductList.css';
import Modal from '../components/Modal';

function ProductList() {
  const [productList, setProductList] = useState([]);
  console.log("🚀 productList", productList);

  // Modal Control
  const [isOpen, setIsOpen] = useState(false); 
  const [modalData, setModalData] = useState({
    name: "", 
    image: ""
  })

  // infinite scroll
  const [currentProducts, setCurrentProducts] = useState([]);
  const [page, setPage] = useState(1);
  const bottom = useRef(null);

  // loading
  const [isLoading, setIsLoading] = useState(true);
  // console.log("🚀 currentProducts", page, currentProducts );
  
  useEffect(() => {
    getProductList();
  }, []);
  
  // api call
  const getProductList = (type = "All") => {
    console.log("👀 API CALLED");

    fetch('http://cozshopping.codestates-seb.link/api/v1/products')
      .then((res) => res.json())
      .then((data) => {

        if (type === "All") {
          setProductList(data);
          setCurrentProducts(data.slice(0, 10 * page));
        }

        if (type !== "All") {
          console.log("👀 카테고리 All 아님")
          console.log("🚀 currentProducts", page, currentProducts );
          const filteredData = data.filter((list) => list.type === type);
          console.log("🛰️ filteredData", filteredData );
          setPage(1);
          setProductList(filteredData);
          setCurrentProducts(filteredData.slice(0, 10 * page));
          console.log("🚀 currentProducts", page, currentProducts );
        }
        
        setIsLoading(false);
      })
  }

  // filter
  const filterListHandler = (type) => {
    console.log("🛰️ typeTest", type)
    getProductList(type);
  }

  // infinite scroll
  const renderNextPage = useCallback(() => {
    setIsLoading(true);
    
    if (page < 10) {
      setCurrentProducts(productList.slice(0, 10 * (page + 1)));
      setPage(page + 1);
    }

    setIsLoading(false);
  }, [page, productList]);

  useEffect(() => {
    if (bottom.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            console.log("🚀 entries", entries);
            console.log("🚀 currentProducts", currentProducts);
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
  const openModalHandler = ( image, brandImg, title, brandName ) => {
    console.log("🚀 OPEN MODAL!", image, brandImg, title, brandName);
    setModalData({
      name: title || brandName,
      image: image || brandImg
    });
    setIsOpen(true);
  }

  const closeModalHandler = () => {
    setIsOpen(false);
  }

  return (
    <>
      <main>
        <Filter onFilter={filterListHandler} />
        <section>
          <ul className="listItem">
            { currentProducts.map((list) => <ListItem key={list.id} {...list} openModal={openModalHandler} /> ) }
          </ul>
        </section>
        { isLoading ? 'loading...' : <div ref={bottom}>TEST: BOTTOM AREA</div>}
        { isOpen && createPortal(
          <Modal modalData={modalData} closeModal={closeModalHandler} />, document.getElementById("modal")
        ) }
      </main>
    </>
  )
}

export default ProductList;