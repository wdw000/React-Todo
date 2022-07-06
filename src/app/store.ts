import { configureStore } from "@reduxjs/toolkit";
import addBtnSlice from "../components/addBtnSlice";
import loginReducer from "../features/login/loginSlice";
import navSlice from "../features/nav/navSlice";
import chartSlice from "../features/todo/chart/chartSlice";
import todoSlice from "../features/todo/todoSlice";
import settingSlice from "../settingSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    nav: navSlice,
    addBtn: addBtnSlice,
    todo: todoSlice,
    setting: settingSlice,
    chart: chartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
