import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { isDataStale } from "../utils/cacheUtils";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  const lastFetchTime = useSelector((store) => store.movies?.lastFetchTime?.trailerVideo);
  console.log("trailerVideoss", trailerVideo);

  const getMovieVideos = async () => {
    if (trailerVideo && !isDataStale(lastFetchTime)) return;

    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          movieId +
          "/videos?language=en-US",
        API_OPTIONS
      );
      const json = await data.json();

      const filterData = json.results.filter((video) => video.type === "Trailer");
      
      const trailer = filterData.length ? filterData[0] : json.results[0];

      
      dispatch(addTrailerVideo(trailer));
    } catch (error) {
      console.error("❌ Error fetching trailer:", error);
    }
  };
  
  useEffect(() => {
    if (movieId) {
      getMovieVideos();
    }
  }, [movieId, dispatch]);
};

export default useMovieTrailer;
