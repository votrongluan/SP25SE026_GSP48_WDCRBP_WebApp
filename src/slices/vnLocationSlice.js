import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  provinces: [],
  districts: [],
  wards: [],
};

const vnLocationSlice = createSlice({
  name: "vnLocation",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state = action.payload;
    },
  },
});

export default vnLocationSlice.reducer;

export const selectVnLocation = (state) => state.vnLocation;
