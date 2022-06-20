import { configureStore } from "@reduxjs/toolkit";
import addBtnSlice from "../components/addBtnSlice";
import loginReducer from "../features/login/loginSlice";
import navSlice from "../features/nav/navSlice";
import todoSlice from "../features/todo/todoSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    nav: navSlice,
    addBtn: addBtnSlice,
    todo: todoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
