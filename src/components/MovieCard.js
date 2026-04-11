import { useDispatch } from "react-redux";
import { setSelectedMovie } from "../utils/moviesSlice";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  
  if (!movie?.poster_path) return null;

  const handleMovieClick = () => {
    dispatch(setSelectedMovie(movie));
  };

  return (
    <div
      className="w-36 md:w-48 pr-4 cursor-pointer hover:scale-110 transition-transform duration-300"
      onClick={handleMovieClick}
    >
      <img
        alt={movie?.title || movie?.original_title}
        src={IMG_CDN_URL + movie.poster_path}
        className="rounded-lg"
      />
    </div>
  );
};
export default MovieCard;
