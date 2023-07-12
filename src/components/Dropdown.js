import { Link } from 'react-router-dom';
import { ReactComponent as ProductList } from '../assets/productListIcon.svg';
import { ReactComponent as Bookmark } from '../assets/bookmarkIcon.svg';
import './Dropdown.css';

function Dropdown() {
  return (
    <div className="dropdown">
      <ul>
        <li>OOO님, 안녕하세요!</li>
        <li>
          <ProductList />
          <Link to="/products/list">상품리스트 페이지</Link>
        </li>
        <li>
          <Bookmark />
          <Link to="/bookmark">북마크 페이지</Link>
        </li>
      </ul>
    </div>
  )
}

export default Dropdown;