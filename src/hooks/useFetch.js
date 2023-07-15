import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getProducts();
  }, [url]);

  const getProducts = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
  };

  return data;
}

export default useFetch;