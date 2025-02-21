import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    token: '',
    loading: false,
    error: null,
  },
  reducers: {
    getTokenId: (state, action) => {
      state.token = action.payload;
    },
  }
})

export const { getTokenId } = sessionSlice.actions;
export default sessionSlice.reducer;