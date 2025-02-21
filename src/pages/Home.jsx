import { useRef, useState } from "react";
import useSearch from "../hooks/useSearch";
import Loader from "../components/loader";
import Movies from "../components/movies";
import DatePicker from "react-datepicker";
import { FaCalendarDays } from "react-icons/fa6";

import "react-datepicker/dist/react-datepicker.css";
import {
  useGetGenresQuery,
  useGetMoviesQuery,
  useLazyGetMovieByTitleQuery,
  useLazyGetMoviesByFilterQuery,
} from "../api/moviesApi";

const Home = () => {
  const [genreSelected, setGenereSelected] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [byVotes, setByVotes] = useState(false);
  const [resetFilters, setResetFilters] = useState(false);
  const [page, setPage] = useState(1);

  const sortVotesInput = useRef(null);
  const genreSelect = useRef(null);
  const searchInput = useRef(null);

  const { search, setUpdateSearch, errorSearch } = useSearch();

  const { data: movies, loading, error } = useGetMoviesQuery(page);
  const {
    data: genres,
    loading: loadingGenres,
    error: errorGenres,
  } = useGetGenresQuery();
  const [
    searchMovies,
    { data: moviesSearch, loading: loadingSearch, error: errorTitle },
  ] = useLazyGetMovieByTitleQuery({});
  const [
    filterMovies,
    { data: filteredMovies, loading: filterLoading, error: filterError },
  ] = useLazyGetMoviesByFilterQuery({});

  if (loading || loadingGenres || loadingSearch || filterLoading) {
    return <Loader />;
  }

  if (error || errorGenres || errorTitle || filterError) {
    return (
      <h1 className='text-white text-center font-bold text-xl'>
        No podemos mostrar peliculas por el momento, pronto volveremos.
      </h1>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isFiltering = startDate || genreSelected || byVotes;

    if (isFiltering) {
      let dateString = "";
      if (startDate) {
        const year = new Date(startDate).getUTCFullYear();
        const month = new Date(startDate).getUTCMonth();
        const day = new Date(startDate).getUTCDay();

        dateString = `${year}-${month < 10 ? `0${month}` : month}-${
          day < 10 ? `0${day}` : day
        }`;
      }
      setResetFilters(false);
      filterMovies({ genreSelected, byVotes, dateString });
      return;
    }
    if (search) {
      setResetFilters(false);
      searchMovies(search);
    }
  };

  const handleChange = (e) => {
    setUpdateSearch(e.target.value);
  };

  const handleChangeGenre = (e) => {
    setGenereSelected(e.target.value);
  };

  const handleChangeVotes = (e) => {
    setByVotes(e.target.checked);
  };

  const handleResetFilters = () => {
    setGenereSelected(0);
    setStartDate(null);
    setByVotes(false);
    sortVotesInput.current.checked = false;
    genreSelect.current.value = 0;
    setResetFilters(true);
  };

  return (
    <>
      <div className='mb-12 px-4 sm:px-0 container mx-auto'>
        <form
          onSubmit={handleSubmit}
          className=' items-center flex justify-center gap-2 flex-col '>
          <div className='relative flex flex-col'>
            <input
              onChange={handleChange}
              ref={searchInput}
              name='query'
              type='text'
              placeholder='¿Qué quieres ver hoy?'
              className='w-full sm:w-auto py-2 px-4 bg-slate-300 dark:bg-slate-950 dark:text-white text-black dark:placeholder:text-white placeholder:text-black rounded-md outline-none focust:outline-none mb-4'
            />
            <div className='flex items-start justify-start gap-4 flex-wrap mb-8'>
              <label className='dark:text-white text-black z-30'>
                <p className='mb-1'> Fecha de lanzamiento</p>
                <div>
                  <DatePicker
                    className='z-30 text-black dark:text-white sm:w-auto py-2 px-4 dark:bg-slate-950 bg-slate-300  placeholder:text-black dark:placeholder:text-white rounded-md outline-none focust:outline-none flex items-center justify-center text-center'
                    showIcon
                    dateFormat='yyyy/MM/dd'
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    icon={<FaCalendarDays className="dark:text-white text-black" />}
                  />
                </div>
              </label>
              <label className='dark:text-white text-black'>
                <p className='mb-1'>Género</p>
                <select
                  onChange={handleChangeGenre}
                  name='genre'
                  ref={genreSelect}
                  id=''
                  className=' sm:w-auto py-2 px-4 dark:bg-slate-950 bg-slate-300 dark:text-white text-black placeholder:text-black dark:placeholder:text-white rounded-md outline-none focust:outline-none '>
                  <option value='0'>Filtra por género</option>
                  {genres &&
                    genres.genres.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                </select>
              </label>
              <label className='text-dark dark:text-white flex gap-2 items-start flex-col '>
                Ordenar por puntuación
                <input
                  onChange={handleChangeVotes}
                  type='checkbox'
                  ref={sortVotesInput}
                  className='w-8 h-8'
                />
              </label>
              <div className='w-full flex gap-4 justify-center flex-wrap md:flex-nowrap'>
                <button
                  className='w-full md:w-6/12 bg-slate-300 dark:bg-slate-800 hover:bg-slate-500 dark:hover:bg-slate-950 focus:shadow-outline focus:outline-none text-dark dark:text-white font-bold py-2 px-4 rounded cursor-pointer transition-all duration-300'
                  type='submit'>
                  Buscar
                </button>
                <div
                  onClick={handleResetFilters}
                  className='w-full md:w-6/12 text-center bg-slate-300 dark:bg-slate-800 hover:bg-slate-500 dark:hover:bg-slate-950 focus:shadow-outline focus:outline-none text-dark dark:text-white font-bold py-2 px-4 rounded cursor-pointer transition-all duration-300'>
                  Reiniciar filtros
                </div>
              </div>
            </div>
          </div>
        </form>

        {errorSearch && (
          <p className='text-red-500 text-center'>{errorSearch}</p>
        )}
      </div>
      <div className='container mx-auto flex justify-center gap-y-8 gap-x-4 flex-wrap px-4 md:px-0 pb-20'>
        {resetFilters ? (
          <Movies movies={movies} />
        ) : (
          <Movies
            movies={
              filteredMovies && filteredMovies.results
                ? filteredMovies
                : moviesSearch && moviesSearch.results
                ? moviesSearch
                : movies
            }
          />
        )}
        <div className='w-full my-4 flex gap-4 justify-center items-center'>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className='bg-slate-300 dark:bg-slate-800 hover:bg-slate-500 dark:hover:bg-slate-950 focus:shadow-outline focus:outline-none text-dark dark:text-white font-bold py-2 px-4 rounded cursor-pointer transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50'
            type='submit'>
            Anterior
          </button>
          <p className='text-dark dark:text-white font-bold'>
            {page} / {movies && movies.total_pages ? movies.total_pages : "100"}
          </p>
          <button
            onClick={() => setPage(page + 1)}
            disabled={movies ? page === movies.total_pages : true}
            className='  bg-slate-300 dark:bg-slate-800 hover:bg-slate-500 dark:hover:bg-slate-950 focus:shadow-outline focus:outline-none text-dark dark:text-white font-bold py-2 px-4 rounded cursor-pointer transition-all duration-300'
            type='submit'>
            Siguiente
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
