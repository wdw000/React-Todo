import React, { useState } from "react";
import "./TodoAddBtn.css";
import TodoInput from "./TodoInput";

interface AddProps {
  date: string;
}

export default function TodoAddBtn(props: AddProps) {
  const [isAdd, setIsAdd] = useState(false);

  let item: JSX.Element;

  if (!isAdd) {
    item = (
      <button className="TodoAddBtn click" onClick={() => handleAddBtn()}>
        +
      </button>
    );
  } else {
    item = <TodoInput setIsAdd={handleAddBtn} date={props.date} />;
  }

  function handleAddBtn() {
    setIsAdd(!isAdd);
  }

  return <div>{item}</div>;
}
