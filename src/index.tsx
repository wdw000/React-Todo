import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./features/login/Login";
import TodoList from "./features/todo/list/TodoList";
import TodoCalendar from "./features/todo/calendar/TodoCalendar";
import PrivateRoute from "./router/PrivateRoute";
import TodoChart from "./features/todo/chart/TodoChart";
import TodoSetting from "./features/setting/TodoSetting";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/todo" element={<Login />}></Route>
        <Route path="/todo/main" element={<PrivateRoute component={<App />} />}>
          <Route path="list" element={<TodoList />} />
          <Route path="calendar" element={<TodoCalendar />} />
          <Route path="chart" element={<TodoChart />} />
          <Route path="setting" element={<TodoSetting />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
