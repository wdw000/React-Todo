import { createSlice } from "@reduxjs/toolkit";

const initialState: Nav = {
  navState: "List",
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    changeNavState: (state, action) => {
      const navState = state;
      navState.navState = action.payload;
    },
  },
});

export const { changeNavState } = navSlice.actions;

export default navSlice.reducer;
