import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  provinces: {},
  districts: {},
  wards: {},
};

const vnLocationSlice = createSlice({
  name: "vnLocation",
  initialState,
  reducers: {
    setProvinces: (state, action) => {
      state.provinces = action.payload;
    },
    setDistricts: (state, action) => {
      state.districts = action.payload;
    },
    setWards: (state, action) => {
      state.wards = action.payload;
    },
  },
});

export const { setProvinces, setDistricts, setWards } = vnLocationSlice.actions;

export default vnLocationSlice.reducer;
