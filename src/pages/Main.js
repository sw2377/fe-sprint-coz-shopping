import ListItem from '../components/ListItem';
import './Main.css';

function Main({ productList }) {

  console.log("productList", productList);

  return (
    <main>
      <section>
        <h2>상품 리스트</h2>
        <ul>
          {productList.map((list) => <ListItem key={list.id} {...list} /> )}
        </ul>
      </section>
      <section>
        <h2>북마크 리스트</h2>
        <ul>
          <li>
            
          </li>
        </ul>
      </section>
    </main>
  )
}

export default Main;