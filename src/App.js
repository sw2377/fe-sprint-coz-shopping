import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './index.css';
import Main from "./pages/Main";
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [productList, setProductList] = useState([])

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = () => {
    fetch('http://cozshopping.codestates-seb.link/api/v1/products?count=4')
      .then((res) => res.json())
      .then((data) => setProductList(data))
  }

  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path='/' element={<Main productList={productList} />} />
        {/* <Route path='/products/list' element={} /> */}
        {/* <Route path='/bookmark' element={} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
