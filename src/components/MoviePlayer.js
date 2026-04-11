import { useDispatch, useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { clearSelectedMovie } from "../utils/moviesSlice";
import useOnlineStatus from "../hooks/useOnlineStatus";

const MoviePlayer = () => {
  const dispatch = useDispatch();
  const isOnline = useOnlineStatus();
  const selectedMovie = useSelector((store) => store.movies.selectedMovie);
  const selectedMovieTrailer = useSelector(
    (store) => store.movies.selectedMovieTrailer
  );

  useMovieTrailer(selectedMovie?.id);

  if (!selectedMovie) return null;

  const handleClose = () => {
    dispatch(clearSelectedMovie());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 text-white hover:text-gray-300 z-60 bg-black bg-opacity-50 rounded-full p-2 w-10 h-10 flex items-center justify-center"
        title="Close"
      >
        ✕
      </button>

      {/* Player Container */}
      <div className="w-full h-full max-w-6xl flex flex-col justify-center">
        {/* Video Player */}
        {!isOnline ? (
          <div className="aspect-video w-full bg-gray-800 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-white text-5xl mb-4">📡</p>
              <p className="text-white text-3xl mb-4">You're Offline</p>
              <p className="text-gray-400 text-lg">
                Video playback requires an internet connection
              </p>
              <button
                onClick={handleClose}
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        ) : selectedMovieTrailer?.key ? (
          <div className="aspect-video w-full">
            <iframe
              className="w-full h-full rounded-lg"
              src={
                "https://www.youtube.com/embed/" +
                selectedMovieTrailer.key +
                "?autoplay=1"
              }
              title={selectedMovie?.title || selectedMovie?.original_title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="aspect-video w-full bg-gray-800 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <p className="text-white text-2xl mb-4">
                {selectedMovie?.title || selectedMovie?.original_title}
              </p>
              <p className="text-gray-400">Trailer not available</p>
            </div>
          </div>
        )}

        {/* Movie Info */}
        <div className="mt-6 px-4">
          <h1 className="text-white text-4xl font-bold mb-2">
            {selectedMovie?.title || selectedMovie?.original_title}
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            {selectedMovie?.release_date
              ? new Date(selectedMovie.release_date).getFullYear()
              : ""}
            {selectedMovie?.vote_average && (
              <span className="ml-4">
                ⭐ {selectedMovie.vote_average.toFixed(1)}/10
              </span>
            )}
          </p>
          <p className="text-gray-300 text-base leading-relaxed max-w-4xl">
            {selectedMovie?.overview}
          </p>
        </div>
      </div>

      {/* Keyboard Shortcut: ESC to close */}
      {typeof window !== "undefined" && (
        <div
          onKeyDown={(e) => {
            if (e.key === "Escape") handleClose();
          }}
          tabIndex={0}
        />
      )}
    </div>
  );
};

export default MoviePlayer;
