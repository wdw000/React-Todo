import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface User {
  uid: string;
  email: string;
  name: string;
  picture: string;
}

const initialState: User = {
  uid: "",
  email: "",
  name: "",
  picture: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    saveLoginUser: (state, action) => {
      const user = state;
      const response: User = action.payload;

      user.uid = response.uid;
      user.email = response.email;
      user.name = response.name;
      user.picture = response.picture;
    },
    logout: (state) => {
      state.uid = initialState.uid;
      state.email = initialState.email;
      state.name = initialState.name;
      state.picture = initialState.picture;
    },
  },
});

export const { saveLoginUser, logout } = loginSlice.actions;

export const selectLogin = (state: RootState) => state.login;

export const selectUid = (state: RootState) => state.login.uid;

export const selectLoginImg = (state: RootState) => state.login.picture;

export default loginSlice.reducer;
