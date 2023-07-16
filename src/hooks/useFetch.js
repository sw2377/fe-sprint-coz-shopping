import { useState, useEffect } from 'react';

const useFetch = (url) => {
  
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    getProducts();
  }, [url]);

  const getProducts = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const addIsBookmark = data.map((list) => list = { ...list, isBookmark: false })
        return setMyData(addIsBookmark)
      })
  };

  return myData;
}

export default useFetch;