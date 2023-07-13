import { useState } from 'react';
import './ListItem.css';
import { ReactComponent as Bookmark } from '../assets/icons/bookmarkIcon.svg';

function ListItem( { openModal, ...list} ) {
  
  const [bookmark, setBookmark] = useState(false);

  const openModalHandler = ( image, brandImg, title, brandName ) => {
    // console.log("🚀 OPEN MODAL", image, brandImg, title, brandName )
    openModal(image, brandImg, title, brandName);
  }

  return (
    <li onClick={() => openModalHandler(list.image_url, list.brand_image_url, list.title, list.brand_name)}>
      <div 
        className="img" 
        style={{ backgroundImage: list.type === "Brand" ? `url("${list.brand_image_url}")` : `url("${list.image_url}")` }}
      >
        {/* bookmark */}
        <div className="bookmark_icon" onClick={() => setBookmark(!bookmark)}>
          <Bookmark 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fillOpacity={ bookmark ? "1" : "0.8" } 
            fill={ bookmark ? "#FFD361" : "#DFDFDF" } 
          />
        </div>
        {/* <img src={list.image_url} alt="" /> */}
      </div>
      
      {/* type별 조건부 렌더링 */}
      {list.type === "Product" && (
        <div className="desc flex">
          <span className="title">{list.title}</span>
          <div>
            <span className="discount_percentage">{list.discountPercentage}%</span>
            <span className="price">{Number(list.price).toLocaleString()}원</span>
          </div>
        </div>
      )}
      {list.type === "Category" && (
        <div className="desc">
          <span className="title"># {list.title}</span>
        </div>
      )}
      {list.type === "Exhibition" && (
        <div className="desc">
          <span className="title">{list.title}</span>
          <span className="sub_title">{list.sub_title}</span>
        </div>
      )}
      {list.type === "Brand" && (
        <div className="desc flex">
          <span className="title">{list.brand_name}</span>
          <div>
            <span className="follower">관심고객수</span>
            <span className="follower_number">{(list.follower).toLocaleString()}</span>
          </div>
        </div>
      )}
    </li>
  )
}

export default ListItem;