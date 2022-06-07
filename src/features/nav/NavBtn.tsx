import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./NavBtn.css";
import { changeNavState } from "./navSlice";

interface navBtnProps {
  buttons: string[];
}

function NavBtn(props: navBtnProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navState = useSelector((state: State) => state.nav.navState);

  const navButtons = props.buttons.map((btn) => {
    return (
      <li key={btn} className={"click " + btn} onClick={() => clickNavBtn(btn)}>
        <div>{btn}</div>
      </li>
    );
  });

  function clickNavBtn(target: string) {
    dispatch(changeNavState(target));
  }

  useEffect(() => {
    const btnList = document.querySelectorAll(".NavBtn .click");
    const onBtn = document.querySelector(`.NavBtn .${navState}`);

    btnList.forEach((item) => {
      item.classList.remove("on");
    });
    onBtn?.classList.add("on");

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
