import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state = action.payload;
    },
  },
});

export default authSlice.reducer;

export const selectAuth = (state) => state.auth;
