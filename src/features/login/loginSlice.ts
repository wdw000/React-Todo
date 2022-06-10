import { createSlice } from "@reduxjs/toolkit";

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

export const selectLogin = (state: State) => state.login;

export const selectUid = (state: State) => state.login.uid;

export const selectLoginImg = (state: State) => state.login.picture;

export default loginSlice.reducer;
