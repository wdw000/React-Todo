import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./NavBtn.css";
import { changeNavState, selectNavState } from "./navSlice";

interface navBtnProps {
  buttons: string[];
}

function NavBtn(props: navBtnProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navState = useSelector(selectNavState);

  const [test, test2] = useState(["stirng"]);

  const navButtons = props.buttons.map((btn) => {
    return (
      <li
        key={btn}
        className={"click " + (navState === btn && "on")}
        onClick={() => clickNavBtn(btn)}
      >
        <div>{btn}</div>
      </li>
    );
  });

  function clickNavBtn(target: string) {
    dispatch(changeNavState(target));
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
    }
  }, [navState, navigate]);

  return (
    <nav className="NavBtn">
      <ul>{navButtons}</ul>
    </nav>
  );
}

export default NavBtn;
