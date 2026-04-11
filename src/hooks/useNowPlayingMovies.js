import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { isDataStale } from "../utils/cacheUtils";
import useOnlineStatus from "./useOnlineStatus";

const useNowPlayingMovies = () => {
  const isOnline = useOnlineStatus(); 
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector((store) => store.movies?.nowPlayingMovies);
  const lastFetchTime = useSelector((store) => store.movies?.lastFetchTime?.nowPlayingMovies);

  const getNowPlayingMovies = async () => {
    if (!isOnline) return;
    if (nowPlayingMovies && !isDataStale(lastFetchTime)) return;

    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?page=1",
        API_OPTIONS
      );
      const data = await response.json();
      dispatch(addNowPlayingMovies(data.results));
    } catch (error) {
      console.error("Error fetching now playing movies:", error);
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, [isOnline]);

  return { data: nowPlayingMovies };
};

export default useNowPlayingMovies;