import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeNavState, selectNavState } from "./navSlice";
import "./NavBtnM.css";

interface NavBtnMProps {
  buttons: string[];
  isMenu: boolean;
  setIsMenu: Function;
}

export default function NavBtnM(props: NavBtnMProps) {
  const navState = useSelector(selectNavState);
  const dispatch = useDispatch();
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    if (props.isMenu) {
      setAnimation(true);
    } else {
      setTimeout(() => {
        setAnimation(false);
      }, 400);
    }
  }, [props.isMenu]);

  function clickNavList(target: string) {
    dispatch(changeNavState(target));
    props.setIsMenu(false);
  }

  const menuList = props.buttons.map((btn) => {
    return (
      <li
        key={btn}
        className={"click " + (navState === btn ? "on" : "off")}
        onClick={() => clickNavList(btn)}
      >
        {btn}
      </li>
    );
  });

  return (
    <div
      className={`${
        props.isMenu ? "slide-fade-in NavBtnM" : "slide-fade-out NavBtnM"
      }`}
    >
      <ul>{animation && menuList}</ul>
    </div>
  );
}
