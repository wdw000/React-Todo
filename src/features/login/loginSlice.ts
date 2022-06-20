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
      const response = action.payload;

      user.uid = response.uid;
      user.email = response.email;
      user.name = response.name;
      user.picture = response.picture;
    },
  },
});

export const { saveLoginUser } = loginSlice.actions;

export const selectLogin = (state: RootState) => state.login;

export const selectUid = (state: RootState) => state.login.uid;

export const selectLoginImg = (state: RootState) => state.login.picture;

export default loginSlice.reducer;
