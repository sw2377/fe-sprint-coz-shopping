import ListItem from '../components/ListItem';
import './Main.css';

function Main({ productList }) {
  console.log("productList", productList);

  return (
    <main>
      <section>
        <h2>상품 리스트</h2>
        <ul className="listItem">
          {productList.map((list) => <ListItem key={list.id} {...list} /> )}
        </ul>
      </section>
      <section>
        <h2>북마크 리스트</h2>
        <div>🥲 북마크 된 아이템이 없습니다! 👀 </div>
        {/* <ul>
          <li>
            
          </li>
        </ul> */}
      </section>
    </main>
  )
}

export default Main;