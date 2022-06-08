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

export const selectNavState = (state: State) => state.nav.navState;

export default navSlice.reducer;
