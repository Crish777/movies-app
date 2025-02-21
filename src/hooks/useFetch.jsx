import { useEffect, useState } from "react";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading("loading...");
    setData(null);
    setError(null);
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        const result = await response.json();
        setData(result); 
      } catch (error) {
        setError(error); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [url, options]);

  return {data, loading, error};
};

export default useFetch;
