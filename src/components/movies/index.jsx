import CardMovies from "../cardMovies";
import NoMoviesResult from "../noMoviesResult";


const Movies = ({movies}) => {
  const hasMovies = movies && movies.results && movies.results.length > 0;
  return (
    hasMovies 
    ? movies.results.map((movie) => (<CardMovies key={movie.id} movie={movie} />))
    : <NoMoviesResult />
  )
}

export default Movies