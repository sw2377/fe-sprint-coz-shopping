import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './index.css';
import Main from "./pages/Main";
import Bookmark from './pages/Bookmark';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './pages/ProductList';

function App() {

  const [bookmark, setBookmark] = useState([
    {
      "id": 84,
      "type": "Brand",
      "title": null,
      "sub_title": null,
      "brand_name": "애플",
      "price": null,
      "discountPercentage": null,
      "image_url": null,
      "brand_image_url": "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      "follower": 9201
    }, 
    {
      "id": 76,
      "type": "Category",
      "title": "파티용품",
      "sub_title": null,
      "brand_name": null,
      "price": null,
      "discountPercentage": null,
      "image_url": "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80",
      "brand_image_url": null,
      "follower": null
    },
    {
      "id": 14,
      "type": "Brand",
      "title": null,
      "sub_title": null,
      "brand_name": "나이키",
      "price": null,
      "discountPercentage": null,
      "image_url": null,
      "brand_image_url": "https://images.unsplash.com/photo-1608541737042-87a12275d313?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1722&q=80",
      "follower": 7598
    },
    {
      "id": 23,
      "type": "Product",
      "title": "뉴발란스990",
      "sub_title": null,
      "brand_name": null,
      "price": "229000",
      "discountPercentage": 25,
      "image_url": "https://images.unsplash.com/photo-1667453799963-5509cd48986a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80",
      "brand_image_url": null,
      "follower": null
    }
  ]);

  useEffect(() => {
    // console.log("🚀 bookmark", bookmark)
  },[bookmark])
 
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Main bookmark={bookmark}/>} />
        <Route path='/products/list' element={<ProductList />} />
        <Route path='/bookmark' element={<Bookmark />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
