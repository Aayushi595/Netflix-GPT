import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieResults: null,
    movieNames: null,
    previousSearches: [],
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResult: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;

      state.previousSearches.push({
        timestamp: Date.now(),
        movieNames,
        movieResults,
      });

      if (state.previousSearches.length > 1) {
        state.previousSearches.shift();
      }
    },
    clearGptMovieResult: (state) => {
      state.movieResults = null;
      state.movieNames = null;
    },
  },
});

export const { toggleGptSearchView, addGptMovieResult, clearGptMovieResult } =
  gptSlice.actions;

export default gptSlice.reducer;
