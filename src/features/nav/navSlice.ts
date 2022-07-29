import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface Nav {
  navState: "List" | "Calendar" | "Chart" | "Setting";
}

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

export const selectNavState = (state: RootState) => state.nav.navState;

export default navSlice.reducer;
