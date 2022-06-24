import React from "react";
import { useSelector } from "react-redux";

import TodoAddBtn from "../../../components/TodoAddBtn";
import { selectListTodos, selectOrder } from "../todoSlice";
import { TodoFilter } from "./TodoFilter";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const data = useSelector(selectListTodos);
  const order = useSelector(selectOrder);
  let todos;

  switch (order.filter) {
    case "all":
      todos = data;
      break;
    case "completed":
      todos = data.filter((todo) => todo.completed === true);
      break;
    case "incompleted":
      todos = data.filter((todo) => todo.completed === false);
      break;
  }

  const item = todos.map((todo) => <TodoItem todo={todo} key={todo.id} />);

  return (
    <div className="TodoList">
      <TodoFilter />
      <TodoAddBtn />
      {item}
    </div>
  );
}
