import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    trailerVideo: null,
    selectedMovie: null,
    selectedMovieTrailer: null,
    lastFetchTime: {
      nowPlayingMovies: null,
      popularMovies: null,
      trailerVideo: null,
    },
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      if (!state.lastFetchTime) {
        state.lastFetchTime = {
          nowPlayingMovies: null,
          popularMovies: null,
          trailerVideo: null,
        };
      }
      state.nowPlayingMovies = action.payload;
      state.lastFetchTime.nowPlayingMovies = Date.now();
    },
    addPopularMovies: (state, action) => {
      if (!state.lastFetchTime) {
        state.lastFetchTime = {
          nowPlayingMovies: null,
          popularMovies: null,
          trailerVideo: null,
        };
      }
      state.popularMovies = action.payload;
      state.lastFetchTime.popularMovies = Date.now();
    },
    addTrailerVideo: (state, action) => {
      if (!state.lastFetchTime) {
        state.lastFetchTime = {
          nowPlayingMovies: null,
          popularMovies: null,
          trailerVideo: null,
        };
      }
      state.trailerVideo = action.payload;
      state.lastFetchTime.trailerVideo = Date.now();
    },
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },
    setSelectedMovieTrailer: (state, action) => {
      state.selectedMovieTrailer = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
      state.selectedMovieTrailer = null;
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  setSelectedMovie,
  setSelectedMovieTrailer,
  clearSelectedMovie,
} = moviesSlice.actions;

export default moviesSlice.reducer;
