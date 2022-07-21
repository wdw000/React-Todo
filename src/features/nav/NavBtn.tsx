import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./NavBtn.css";
import { changeNavState, selectNavState } from "./navSlice";

interface navBtnProps {
  buttons: string[];
}

function NavBtn(props: navBtnProps) {
  const dispatch = useDispatch();
  const navState = useSelector(selectNavState);

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

  const item = <ul>{navButtons}</ul>;

  return <nav className="NavBtn">{item}</nav>;
}

export default NavBtn;
