import React from "react";
import { useSelector } from "react-redux";
import "./Nav.css";
import NavBtn from "./NavBtn";

const Nav = () => {
  const userPicture = useSelector((state: any) => state.login.picture);
  const navButtons = ["List", "Calendar", "Chart"];
  const navState = useSelector((state: State) => state.nav.navState);

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
