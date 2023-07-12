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
          <Bookmark width="24" height="24" viewBox="-1 -1 31 31" stroke="black" stroke-width="1.5" />
          <Link to="/bookmark">북마크 페이지</Link>
        </li>
      </ul>
    </div>
  )
}

export default Dropdown;