import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {

  useMovieTrailer(550);

  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);


  return (
    <div className=" w-screen">
      {trailerVideo?.key ? (
        <iframe
          className="w-screen aspect-video"
          src={
            "https://www.youtube.com/embed/" +
            trailerVideo.key +
            "?&autoplay=1&mute=1"
          }
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      ) : (
        <div className="w-screen aspect-video bg-gray-900 flex items-center justify-center">
          <p className="text-white text-lg">Loading trailer...</p>
        </div>
      )}
    </div>
  );
};
export default VideoBackground;
