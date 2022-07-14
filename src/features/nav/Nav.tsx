import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectLoginImg } from "../login/loginSlice";
import "./Nav.css";
import NavBtn from "./NavBtn";
import { selectNavState } from "./navSlice";
import { LogoutOutlined } from "@mui/icons-material";

const Nav = () => {
  const userPicture = useSelector(selectLoginImg);
  const navButtons = ["List", "Calendar", "Chart"];
  const navState = useSelector(selectNavState);
  const dispatch = useDispatch();

  return (
    <header>
      <div className="header-left">
        <h1>Todo-{navState}</h1>
        <NavBtn buttons={navButtons} />
      </div>
      <div className="header-right">
        <img src={userPicture} alt="user profile img" />
        <button onClick={() => dispatch(logout())}>
          <LogoutOutlined fontSize="inherit" />
        </button>
      </div>
    </header>
  );
};

export default Nav;
