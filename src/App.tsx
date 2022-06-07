import React from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Nav from "./features/nav/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;
