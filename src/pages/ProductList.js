import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ListItem from '../components/ListItem';
import Filter from '../components/Filter';
import './ProductList.css';
import Modal from '../components/Modal';

function ProductList() {

  // Modal Control
  const [isOpen, setIsOpen] = useState(false); 
  const [modalData, setModalData] = useState({
    name: "", 
    image: ""
  })

  // TODO:: API 호출 App.js 랑 통합가능?
  const [productList, setProductList] = useState([]);
  // console.log("🚀 productList", productList);

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = (type = "All") => {
    fetch('http://cozshopping.codestates-seb.link/api/v1/products?count=10')
      .then((res) => res.json())
      .then((data) => {
        setProductList(data);

        if (type !== "All") {
          const filteredData = data.filter((list) => list.type === type);
          setProductList(filteredData);
        }
      })
  }

  const filterListHandler = (type) => {
    // console.log("🚀 typeTest", type)
    getProductList(type);
  }

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
            { productList.map((list) => <ListItem key={list.id} {...list} openModal={openModalHandler} /> ) }
          </ul>
        </section>
        { isOpen && createPortal(
          <Modal modalData={modalData} closeModal={closeModalHandler} />, document.getElementById("modal")
        ) }
      </main>
    </>
  )
}

export default ProductList;