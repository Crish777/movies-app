import { useParams } from "react-router";
import Loader from "../components/loader";
import { useGetMovieByIdQuery } from "../api/moviesApi";


const MovieDetail = () => {
  const params = useParams();
  const {data, loading, error} = useGetMovieByIdQuery(params.movieid);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <h1 className="text-center text-black dark:text-white text-2xl font-bold">No podemos mostrar la pelicula por el momento, intenta mas tarde</h1>
    );
  }


  if (!data) {
    return <Loader />;
  }

  return (
    <div className='container mx-auto flex items-start justify-between pt-0 p-8 shadow-2xl flex-col md:flex-row gap-8'>
      <div className='w-full md:w-1/2 rounded-3xl overflow-hidden'>
        <img className='w-full h-full object-cover' src={data && data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : "/img/default.jpg"} />
      </div>
      <div className="w-full md:w-1/2">
      {data && data.original_title && <h2 className="text-black dark:text-white text-2xl font-bold mb-4">{data.original_title}</h2>}
      {data && data.overview && <p className="text-slate-600 dark:text-gray-400 text-lg mb-4">{data.overview}</p>}
      {data && data.vote_average && <p className="text-green-600 text-2xl mb-4">Puntuación: <span className="text-slate-400">{data.vote_average} / 10</span></p>}
      {data && data.runtime && <p className="text-blue-600 text-xl mb-4">Duración: <span className="text-slate-400">{data.runtime} mins</span></p>}
      </div>
    </div>
  );
};

export default MovieDetail;
