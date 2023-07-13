import { useState, useEffect } from 'react';
import ListItem from '../components/ListItem';
import Filter from '../components/Filter';
import './ProductList.css';

function ProductList() {

  // TODO:: App.js 랑 통합가능?
  const [productList, setProductList] = useState([]);
  // console.log("🚀 productList", productList);

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = (type = "All") => {
    fetch('http://cozshopping.codestates-seb.link/api/v1/products')
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
  
  return (
    <>
      <main>
        <Filter onFilter={filterListHandler} />
        <section>
          <ul className="listItem">
            { productList.map((list) => <ListItem key={list.id} {...list} /> ) }
            {/* { productList.map((list) => {
              const updatedList = productList.filter((list) => list.type === "Product")
              
            }) } */}
            

          </ul>
        </section>
      </main>
    </>
  )
}

export default ProductList;