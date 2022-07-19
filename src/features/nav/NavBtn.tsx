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

  const [visible, setVisible] = useState(true);
  const [pageY, setPageY] = useState(0);

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

  useEffect(() => {
    console.log("이벤트 시작");
    window.addEventListener("scroll", handleScroll);

    return () => {
      console.log("이벤트 종료");
      window.removeEventListener("scroll", handleScroll);
    };
  });

  function clickNavBtn(target: string) {
    dispatch(changeNavState(target));
  }

  function handleScroll() {
    const { scrollY } = window;
    setVisible(pageY > scrollY);
    setPageY(scrollY);
    return;
  }

  const item = visible ? <ul>{navButtons}</ul> : undefined;

  return <nav className="NavBtn">{item}</nav>;
}

export default NavBtn;
