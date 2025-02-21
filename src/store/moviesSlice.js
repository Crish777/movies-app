import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    favorites: []
  },
  reducers: {
    fetchMovies: (state, action) => {
      return action.payload;
    },
    toggleFavorite: (state, action) => {
      const id = action.payload;
      const index = state.favorites.indexOf(id);
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(id);
      }
    }
  }
});

export const { fetchMovies, toggleFavorite } = moviesSlice.actions;
export default moviesSlice.reducer;