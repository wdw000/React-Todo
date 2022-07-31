import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import "./TodoAddBtn.css";
import TodoInput from "./TodoInput";

interface AddProps {
  date: string | undefined;
}

export default function TodoAddBtn(props: AddProps) {
  const [isAdd, setIsAdd] = useState(false);
  const [pageY, setPageY] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    function handleScroll() {
      const { scrollY } = window;
      setShow(scrollY < pageY);
      setPageY(scrollY);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageY]);

  function handleAddBtn() {
    setIsAdd(!isAdd);
  }

  const item = !isAdd ? (
    <div className="TodoAddBtn">
      <Add
        className={!show ? "add click on" : "add click"}
        onClick={() => handleAddBtn()}
        fontSize="inherit"
      />
    </div>
  ) : (
    <TodoInput setIsAdd={handleAddBtn} date={props.date} />
  );

  return <div>{item}</div>;
}
