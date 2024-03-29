import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectLoginImg } from "../login/loginSlice";
import "./Nav.css";
import NavBtn from "./NavBtn";
import { selectNavState } from "./navSlice";
import { Close, LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import NavBtnM from "./NavBtnM";

const Nav = () => {
  const userPicture = useSelector(selectLoginImg);
  const navButtons = ["List", "Calendar", "Chart", "Setting"];
  const navState = useSelector(selectNavState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenu, setIsMenu] = useState(false);

  function handleLogout() {
    sessionStorage.removeItem("res");
    dispatch(logout());
  }

  useEffect(() => {
    switch (navState) {
      case "List":
        navigate("list");
        break;
      case "Calendar":
        navigate("calendar");
        break;
      case "Chart":
        navigate("chart");
        break;
      case "Setting":
        navigate("setting");
        break;
    }
  }, [navState, navigate]);

  const mobileMenu = isMenu ? (
    <Close
      className="click mobile-menu"
      fontSize="inherit"
      onClick={() => setIsMenu(!isMenu)}
    />
  ) : (
    <MenuOutlined
      className="click mobile-menu"
      fontSize="inherit"
      onClick={() => setIsMenu(!isMenu)}
    />
  );
  return (
    <div className="header-wrap">
      <header>
        {mobileMenu}
        <div className="header-left">
          <h2>{isMenu ? "Menu" : navState}</h2>
          <NavBtn buttons={navButtons} />
        </div>
        <div className="header-right">
          <img src={userPicture} alt="user profile img" />

          <LogoutOutlined
            onClick={() => handleLogout()}
            fontSize="inherit"
            className="click logout-btn"
          />
        </div>
      </header>
      <NavBtnM isMenu={isMenu} setIsMenu={setIsMenu} buttons={navButtons} />
    </div>
  );
};

export default Nav;
