import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";
import { isDataStale } from "../utils/cacheUtils";
import useOnlineStatus from "./useOnlineStatus";

const usePopularMovies = () => {
  const isOnline = useOnlineStatus(); 
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const popularMovies = useSelector((store) => store.movies?.popularMovies);
  const lastFetchTime = useSelector((store) => store.movies?.lastFetchTime?.popularMovies);

  const getPopularMovies = useCallback(async () => {
    if (!isOnline) return;
    if (popularMovies && !isDataStale(lastFetchTime)) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?page=1",
        API_OPTIONS
      );
      const json = await response.json();
      if (json?.results) {
        dispatch(addPopularMovies(json.results));
      }
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    } finally {
      setIsLoading(false);
    }
  }, [isOnline, popularMovies, lastFetchTime, dispatch]);

  useEffect(() => {
    getPopularMovies();
  }, [getPopularMovies]); 

  return { data: popularMovies, isLoading };
};

export default usePopularMovies;