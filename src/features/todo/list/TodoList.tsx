import React from "react";
import { useSelector } from "react-redux";

import TodoAddBtn from "../../../components/TodoAddBtn";
import { selectTodayTodos } from "../todoSlice";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const todayTodos = useSelector(selectTodayTodos);
  const item = todayTodos.map((todo) => <TodoItem todo={todo} key={todo.id} />);

  return (
    <div className="TodoList">
      <TodoAddBtn />
      {item}
    </div>
  );
}
