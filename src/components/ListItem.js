import './ListItem.css';

function ListItem(list) {
  console.log("list", list)

  return (
    <li>
      <div className="img">
        <img src={list.image_url} alt="" />
      </div>
      <div className="desc">
        {/* type이 brand일 경우만 title은 brand_name */}
        <span className="title">{list.title}</span>
        <span className="discount_percentage">{list.discountPercentage}%</span>
        <span className="price">{list.price}</span>
      </div>
    </li>
  )
}

export default ListItem;