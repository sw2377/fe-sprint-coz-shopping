import { Link } from 'react-router-dom';
import { ReactComponent as ProductList } from '../assets/icons/productListIcon.svg';
import { ReactComponent as Bookmark } from '../assets/icons/bookmarkIcon.svg';
import './Dropdown.css';

function Dropdown({ isOpen, setIsOpen }) {

  return (
    <div className="dropdown">
      <ul>
        <li>OOO님, 안녕하세요!</li>
        <li>
          <ProductList />
          <Link to="/products/list" onClick={() => setIsOpen(!isOpen)}>상품리스트 페이지</Link>
        </li>
        <li>
          <Bookmark width="24" height="24" viewBox="-1 -1 31 31" stroke="black" strokeWidth="1.5" />
          <Link to="/bookmark" onClick={() => setIsOpen(!isOpen)}>북마크 페이지</Link>
        </li>
      </ul>
    </div>
  )
}

export default Dropdown;