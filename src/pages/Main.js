import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Main.css';
import ListItem from '../components/ListItem';
import Modal from '../components/Modal';

function Main() {

  const [productList, setProductList] = useState([])

  // Modal Control
  const [isOpen, setIsOpen] = useState(false); 
  const [modalData, setModalData] = useState({
    name: "", 
    image: ""
  })

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = () => {
    fetch('http://cozshopping.codestates-seb.link/api/v1/products?count=4')
      .then((res) => res.json())
      .then((data) => setProductList(data))
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
    <main>
      <section>
        <h2>상품 리스트</h2>
        <ul className="listItem">
          {productList.map((list) => <ListItem key={list.id} {...list} openModal={openModalHandler} /> )}
        </ul>
      </section>
      <section>
        <h2>북마크 리스트</h2>
        <div>🥲 북마크 된 아이템이 없습니다! 👀 </div>
        {/* <ul>
          <li>
            
          </li>
        </ul> */}
      </section>

      { isOpen && createPortal(
        <Modal modalData={modalData} closeModal={closeModalHandler} />, document.getElementById("modal")
      ) }
    </main>
  )
}

export default Main;