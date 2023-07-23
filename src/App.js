import { Route, Routes } from 'react-router-dom';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from "./pages/Main";
import ProductList from './pages/ProductList';
import Bookmark from './pages/Bookmark';

function App() {
 
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/products/list' element={<ProductList />} />
        <Route path='/bookmark' element={<Bookmark />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
