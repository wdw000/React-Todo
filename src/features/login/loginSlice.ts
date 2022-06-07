import { createSlice } from "@reduxjs/toolkit";

const initialState: User = {
  uid: "",
  name: "",
  email: "",
  picture: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    saveLoginUser: (state, action) => {
      const user = state;
      const { uid, name, email, picture } = action.payload;

      user.uid = uid;
      user.name = name;
      user.email = email;
      user.picture = picture;
    },
  },
});

export const { saveLoginUser } = loginSlice.actions;

export default loginSlice.reducer;
