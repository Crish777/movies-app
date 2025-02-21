import  { useEffect, useRef, useState } from 'react'

const useSearch = () => {
  const [search, setUpdateSearch] = useState('');
  const [errorSearch, setError] = useState(null);

  const isFirstInput = useRef(true);

  useEffect(() => {

    if(isFirstInput.current){
      isFirstInput.current = search === "";
      return;
    }

    if(search === ""){
      setError("La búsqueda no puede estar vacía");
      return;
    }
    if(search.length < 3){
      setError("La búsqueda debe tener al menos 3 caracteres");
    }else{
      setError("");
    }
  }, [search])


  return {search, setUpdateSearch, errorSearch}
}

export default useSearch