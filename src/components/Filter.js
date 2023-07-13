import { useState } from 'react';
import filterAllImg from '../assets/images/all.png';
import filterProductImg from '../assets/images/product.png';
import filterCategoryImg from '../assets/images/category.png';
import filterExhibitionImg from '../assets/images/exhibition.png';
import filterBrandImg from '../assets/images/brand.png';

function Filter() {
  
  const [selected, setSelected] = useState(false);

  const filteredList = [
    {
      id: 1,
      title: "전체",
      image: `${filterAllImg}`
    },
    {
      id: 2,
      title: "상품",
      image: `${filterProductImg}`
    },
    {
      id: 3,
      title: "카테고리",
      image: `${filterCategoryImg}`
    },
    {
      id: 4,
      title: "기획전",
      image: `${filterExhibitionImg}`
    },
    {
      id: 5,
      title: "브랜드",
      image: `${filterBrandImg}`
    },
  ]

  const filteredListClickHandler = (targetId) => {
    console.log(targetId)
  }


  return (
    <section>
      <ul className="filter_wrapper">
        { filteredList.map((list) => (
          <li key={list.id} onClick={() => filteredListClickHandler(list.id)}>
            <img src={list.image} alt="" />
            <span>{list.title}</span>
          </li>
        ))}

        {/* <li>
          <img src={filterAllImg} alt="" />
          <span>전체</span>
        </li>
        <li>
          <img src={filterProductImg} alt="" />
          <span>상품</span>
        </li>
        <li>
          <img src={filterCategoryImg} alt="" />
          <span>카테고리</span>
        </li>
        <li>
          <img src={filterExhibitionImg} alt="" />
          <span>기획전</span>
        </li>
        <li>
          <img src={filterBrandImg} alt="" />
          <span>브랜드</span>
        </li> */}

      </ul>   
    </section>
  )
}

export default Filter;