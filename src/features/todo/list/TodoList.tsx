import React from "react";
import { useSelector } from "react-redux";

import TodoAddBtn from "../../../components/TodoAddBtn";
import {
  selectCloseTodos,
  selectListTodos,
  selectOrder,
  Todo,
} from "../todoSlice";
import { TodoFilter } from "./TodoFilter";
import TodoItem from "../../../components/TodoItem";
import TodoClosedWarning from "./TodoClosedWarning";
import moment from "moment";

export default function TodoList() {
  const data = useSelector(selectListTodos);
  const order = useSelector(selectOrder);
  const closeTodos = useSelector(selectCloseTodos);
  let todos: Todo[];

  function compareStartDate(a: Todo, b: Todo) {
    if (a.start_date === b.start_date) {
      return moment(b.timestamp).diff(a.timestamp);
    } else {
      return moment(b.start_date).diff(a.start_date);
    }
  }

  function compareEndDate(a: Todo, b: Todo) {
    if (a.end_date === b.end_date) {
      return moment(b.timestamp).diff(a.timestamp);
    } else {
      return moment(b.end_date).diff(a.end_date);
    }
  }

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

  if (order.important) {
    const important = todos.filter((item) => item.important === true);
    const trivial = todos.filter((item) => item.important === false);

    if (order.latest) {
      if (order.isStart) {
        important.sort((a, b) => compareStartDate(a, b));
        trivial.sort((a, b) => compareStartDate(a, b));
      } else {
        important.sort((a, b) => compareEndDate(a, b));
        trivial.sort((a, b) => compareEndDate(a, b));
      }
    } else {
      if (order.isStart) {
        important.sort((a, b) => compareStartDate(b, a));
        trivial.sort((a, b) => compareStartDate(b, a));
      } else {
        important.sort((a, b) => compareEndDate(b, a));
        trivial.sort((a, b) => compareEndDate(b, a));
      }
    }

    todos = [...important, ...trivial];
  } else {
    if (order.latest) {
      if (order.isStart) {
        todos.sort((a, b) => compareStartDate(a, b));
      } else {
        todos.sort((a, b) => compareEndDate(a, b));
      }
    } else {
      if (order.isStart) {
        todos.sort((a, b) => compareStartDate(b, a));
      } else {
        todos.sort((a, b) => compareEndDate(b, a));
      }
    }
  }

  const item = todos.map((todo) => <TodoItem todo={todo} key={todo.id} />);

  return (
    <div className="TodoList">
      <TodoFilter />
      <TodoAddBtn />
      {closeTodos.length !== 0 && <TodoClosedWarning />}
      {item}
    </div>
  );
}
