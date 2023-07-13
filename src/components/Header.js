import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { ReactComponent as Menubar } from '../assets/icons/menubar.svg';
import Dropdown from './Dropdown';
import './Header.css';

function Header() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <div className="header_inner">
        <h1>
          <Link to="/">
            <Logo />
            <span>COZ Shopping</span>
          </Link>
        </h1>
        <Menubar className="menubar" onClick={() => setIsOpen(!isOpen)} />
        { isOpen && <Dropdown /> }
      </div>
    </header>
  )
}

export default Header;