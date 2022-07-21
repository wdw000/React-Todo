import React, { useEffect, useState } from "react";
import "./TodoAddBtn.css";
import TodoInput from "./TodoInput";

interface AddProps {
  date: string;
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
    <button
      className={`TodoAddBtn click`}
      onClick={() => handleAddBtn()}
      hidden={!show}
    >
      +
    </button>
  ) : (
    <TodoInput setIsAdd={handleAddBtn} date={props.date} />
  );

  return <>{item}</>;
}
