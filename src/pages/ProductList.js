import { useState, useEffect } from 'react';
import ListItem from '../components/ListItem';
import './ProductList.css';
import Filter from '../components/Filter';

function ProductList() {

  // App.js 랑 통합가능?
  const [productList, setProductList] = useState([])

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = () => {
    fetch('http://cozshopping.codestates-seb.link/api/v1/products?count=10')
      .then((res) => res.json())
      .then((data) => setProductList(data))
  }

  console.log("productList", productList);
  
  return (
    <>
      <main>
        <Filter />
        <section>
          <ul className="listItem">
            {productList.map((list) => <ListItem key={list.id} {...list} /> )}
          </ul>
        </section>
      </main>
    </>
  )
}

export default ProductList;