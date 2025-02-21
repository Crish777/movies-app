import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../store/moviesSlice";
import { Link } from "react-router";

const CardMovies = ({ movie }) => {
  const favorites = useSelector((state) => state.movies.favorites);
  const sessionId = useSelector((state) => state.session.token);
  const [isFavorite, setIsFavorite] = useState(favorites.includes(movie.id));
  const dispatch = useDispatch();

  const handleFavorites = () => {
    if (!sessionId) {
      alert("Debes iniciar sesión para agregar a favoritos");
      return;
    }
    dispatch(toggleFavorite(movie.id));
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      key={movie.id}
      className='group relative cursor-pointer overflow-hidden rounded-md shadow-xl w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.3333%-0.6667rem)] lg:w-[calc(25%-0.75rem)] hover:shadow-2xl transition-shadow duration-500'>
      <Link to={`/movie/${movie.id}`} className="absolute top-0 left-0 w-full h-full z-10 block"></Link>
      <div
          className='absolute cursor-pointer top-2 right-2 z-20'
          onClick={() => handleFavorites()}>
          {isFavorite ? (
            <FaHeart size={20} color='#ff0000' />
          ) : (
            <FaRegHeart size={20} color='#ff0000' />
          )}
        </div>
      <div className=' overflow-hidden w-full z-0 relative before:cotent-[""] before:absolute before:inset-0 before:bg-gradient-to-t from-transparent before:to-black before:z-10 before:opacity-50'>
        
        <img
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/img/default.jpg"
          }
          alt={movie.title}
        />
      </div>

      <div className='p-3 w-full'>
        <h2 className='text-2xl mb-2 text-black dark:text-white leading-tight font-semibold'>
          {movie.title || movie.name}
        </h2>
        <p className='text-md mb-2 text-black dark:text-white'>
          {movie.vote_average}/10{" "}
          <span className='text-sm text-cyan-200'>
            ({movie.vote_count}) Votos
          </span>
        </p>
        <p className='text-md text-black dark:text-white'>
          Fecha de lanzamiento:{" "}
          <span className='text-green-500'>
            {movie.release_date || "Muy Pronto"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CardMovies;
