import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlice";
import navSlice from "../features/nav/navSlice";

export default configureStore({
  reducer: {
    login: loginReducer,
    nav: navSlice,
  },
});
