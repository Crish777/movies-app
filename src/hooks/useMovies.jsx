import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../store/moviesSlice";

const useMovies = ({ search, genreSelected, byVotes, startDate }) => {
  const filteredMovies = useSelector((state) => state.movies); 
  const dispatch = useDispatch();
  
  const getFilteredMovies = async () => {
    const hasFilters = genreSelected || byVotes || startDate;
    let url = `https://api.themoviedb.org/3/`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_READ_ACCESS_TOKEN}`,
      },
    };
    if (search) {
      url += `search/movie?query=${search}`;

    } else if (hasFilters) {
      url += `discover/movie?language=en-US&page=1`;
      if (genreSelected) {
        url += `&with_genres=${genreSelected}`;
      }
      if (byVotes) {
        url += `&sort_by=vote_average.desc`;
      }
      if (startDate) {
        const year= new Date(startDate).getUTCFullYear();
        const month= new Date(startDate).getUTCMonth();
        const day= new Date(startDate).getUTCDay();
        url += `&primary_release_date.gte=${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
      }
    }

    const response = await fetch(url, options);
    const result = await response.json();
    dispatch(fetchMovies(result));
  };
  return {  filteredMovies, getFilteredMovies };
 
};

export default useMovies;
