import { createSlice } from "@reduxjs/toolkit";

const darkModeSlice = createSlice({
  name: 'session',
  initialState: {
    isDark: true
  },
  reducers: {
    toogleDarkMode: (state, action) => {
      state.isDark = action.payload
    },
  }
})

export const { toogleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;