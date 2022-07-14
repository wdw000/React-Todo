import React from "react";
import "./TodoList.css";
import { useDispatch, useSelector } from "react-redux";
import TodoAddBtn from "../../../components/TodoAddBtn";
import {
  listDateAdd,
  listDateSub,
  listDateToday,
  selectCloseTodos,
  selectListDate,
  selectListTodos,
  selectOrder,
  Todo,
} from "../todoSlice";
import { TodoFilter } from "../../../components/TodoFilter";
import TodoItem from "../../../components/TodoItem";
import TodoClosedWarning from "./TodoClosedWarning";
import { sortTodo } from "./sortTodo";
import moment from "moment";

export default function TodoList() {
  const data = useSelector(selectListTodos);
  const order = useSelector(selectOrder);
  const closeTodos = useSelector(selectCloseTodos);
  const date = useSelector(selectListDate).slice(2);
  const dispatch = useDispatch();

  let filterTodos: Todo[] = [];

  switch (order.filter) {
    case "all":
      filterTodos = data;
      break;
    case "completed":
      filterTodos = data.filter((todo) => todo.completed === true);
      break;
    case "incompleted":
      filterTodos = data.filter((todo) => todo.completed === false);
      break;
  }

  const todos = sortTodo(filterTodos, order);
  const item = todos.map((todo) => <TodoItem todo={todo} key={todo.id} />);

  return (
    <div className="TodoList">
      <div className="date-control">
        <div className="date">{date}</div>
        <div className="btn-group">
          <button className="click" onClick={() => dispatch(listDateSub())}>
            &lt;
          </button>
          <button className="click" onClick={() => dispatch(listDateToday())}>
            오늘
          </button>
          <button className="click" onClick={() => dispatch(listDateAdd())}>
            &gt;
          </button>
        </div>
      </div>
      <TodoFilter />
      <TodoAddBtn date={moment().format("YYYY-MM-DD")} />
      {closeTodos.length !== 0 && <TodoClosedWarning />}
      {item}
    </div>
  );
}
