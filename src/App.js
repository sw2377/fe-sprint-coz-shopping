import { Route, Routes } from 'react-router-dom';
import './index.css';
import Main from "./pages/Main";
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './pages/ProductList';

function App() {
 
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/products/list' element={<ProductList />} />
        {/* <Route path='/bookmark' element={} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
