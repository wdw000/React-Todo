import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoListInput from "../features/todo/list/TodoListInput";
import { changeIsAdd, selectIsAdd } from "./addBtnSlice";
import "./TodoAddBtn.css";

export default function TodoAddBtn() {
  const dispatch = useDispatch();
  const isAdd = useSelector(selectIsAdd);

  let item: any;

  if (!isAdd) {
    item = (
      <button className="TodoAddBtn click" onClick={() => handleAddBtn()}>
        +
      </button>
    );
  } else {
    item = <TodoListInput />;
  }

  function handleAddBtn() {
    dispatch(changeIsAdd());
  }

  return <div>{item}</div>;
}
