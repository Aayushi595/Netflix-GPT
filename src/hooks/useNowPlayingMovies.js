import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { isDataStale } from "../utils/cacheUtils";
import useOnlineStatus from "./useOnlineStatus";

const useNowPlayingMovies = () => {
  const isOnline = useOnlineStatus(); 
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const nowPlayingMovies = useSelector((store) => store.movies?.nowPlayingMovies);
  const lastFetchTime = useSelector((store) => store.movies?.lastFetchTime?.nowPlayingMovies);

  const getNowPlayingMovies = useCallback(async () => {
    if (!isOnline) return;
    if (nowPlayingMovies && !isDataStale(lastFetchTime)) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?page=1",
        API_OPTIONS
      );
      const data = await response.json();
      if (data?.results) {
        dispatch(addNowPlayingMovies(data.results));
      }
    } catch (error) {
      console.error("Error fetching now playing movies:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isOnline, nowPlayingMovies, lastFetchTime, dispatch]);

  useEffect(() => {
    getNowPlayingMovies();
  }, [getNowPlayingMovies]);

  return { data: nowPlayingMovies, isLoading };
};

export default useNowPlayingMovies;