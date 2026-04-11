import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import useOnlineStatus from "../hooks/useOnlineStatus";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  const isOnline = useOnlineStatus();

  if (!movieNames) return null;

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-90">
      {/* Show banner when serving persisted results */}
      {!isOnline && (
        <div className="mb-2 p-1 bg-yellow-600 rounded text-center font-bold">
          📡 Serving previous search results (Offline)
        </div>
      )}

      <div>
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};
export default GptMovieSuggestions;
