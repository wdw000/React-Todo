import React from "react";
import { useSelector } from "react-redux";
import { selectLoginImg } from "../login/loginSlice";
import "./Nav.css";
import NavBtn from "./NavBtn";
import { selectNavState } from "./navSlice";

const Nav = () => {
  const userPicture = useSelector(selectLoginImg);
  const navButtons = ["List", "Calendar", "Chart"];
  const navState = useSelector(selectNavState);

  return (
    <header>
      <div className="header-left">
        <h1>Todo-{navState}</h1>
        <NavBtn buttons={navButtons} />
      </div>
      <div className="header-right">
        <img src={userPicture} alt="user profile img" />
        <button>setting</button>
        <button>logout</button>
      </div>
    </header>
  );
};

export default Nav;
