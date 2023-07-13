import { useState } from 'react';
import './Filter.css';
import filterAllImg from '../assets/images/all.png';
import filterProductImg from '../assets/images/product.png';
import filterCategoryImg from '../assets/images/category.png';
import filterExhibitionImg from '../assets/images/exhibition.png';
import filterBrandImg from '../assets/images/brand.png';

function Filter({ onFilter }) {
  
  const filteredList = [
    {
      id: 1,
      type: "All",
      title: "전체",
      image: `${filterAllImg}`
    },
    {
      id: 2,
      type: "Product",
      title: "상품",
      image: `${filterProductImg}`
    },
    {
      id: 3,
      type: "Category",
      title: "카테고리",
      image: `${filterCategoryImg}`
    },
    {
      id: 4,
      type: "Exhibition",
      title: "기획전",
      image: `${filterExhibitionImg}`
    },
    {
      id: 5,
      type: "Brand",
      title: "브랜드",
      image: `${filterBrandImg}`
    },
  ]
  const [selected, setSelected] = useState(1);
  
  const toggleClassName = (targetId, type) => {
    setSelected(targetId);
    filteredListHandler(type);
  }

  const filteredListHandler = (type) => {
    onFilter(type)

  }
  
  return (
    <section>
      <ul className="filter_wrapper">
        { filteredList.map((list) => (
          <li 
            key={list.id} 
            className={ list.id === selected ? "selected" : null } 
            onClick={ () => toggleClassName(list.id, list.type) }>
            <img src={list.image} alt="" />
            <span>{list.title}</span>
          </li>
        ))}
      </ul>   
    </section>
  )
}

export default Filter;