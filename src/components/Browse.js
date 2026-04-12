import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";
import MoviePlayer from "./MoviePlayer";
import OfflineBanner from "./OfflineBanner";
import useOnlineStatus from "../hooks/useOnlineStatus";
import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";

const Browse = () => {
  const isOnline = useOnlineStatus();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const selectedMovie = useSelector((store) => store.movies?.selectedMovie);

  const { data: nowPlaying, isLoading: loadingNow } = useNowPlayingMovies();
  const { data: popular, isLoading: loadingPopular } = usePopularMovies();

  return (
    <div>
      <OfflineBanner />
      <Header />
      {selectedMovie && <MoviePlayer />}

      {(loadingNow || loadingPopular) && isOnline ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-white text-2xl">Loading movies...</p>
        </div>
      ) : showGptSearch ? (
        <GptSearch />
      ) : (
        <div>
          {nowPlaying && <MainContainer movies={nowPlaying} />}
          {(nowPlaying || popular) && (
            <SecondaryContainer nowPlaying={nowPlaying} popular={popular} />
          )}
        </div>
      )}
    </div>
  );
};

export default Browse;