import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import "./App.css";
import { AppDispatch } from "./app/store";
import { selectUid } from "./features/login/loginSlice";
import Nav from "./features/nav/Nav";
import { fetchTodos, selectFetchTodosStatus } from "./features/todo/todoSlice";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const uid = useSelector(selectUid);
  const todosStatus = useSelector(selectFetchTodosStatus);

  useEffect(() => {
    if (todosStatus === "idle") {
      dispatch(fetchTodos(uid));
    }
  }, [todosStatus, dispatch, uid]);

  return (
    <div className="App">
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;
