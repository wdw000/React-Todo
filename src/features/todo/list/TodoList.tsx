import React, { useState } from "react";
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
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

export default function TodoList() {
  const data = useSelector(selectListTodos);
  const order = useSelector(selectOrder);
  const closeTodos = useSelector(selectCloseTodos);
  const date = useSelector(selectListDate).slice(2);
  const dispatch = useDispatch();
  const [isClosedMore, setIsClosedMore] = useState(false);
  const [isSortMore, setIsSortMore] = useState(false);

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

  const closed = !isSortMore ? (
    closeTodos.length !== 0 ? (
      <TodoClosedWarning isMore={isClosedMore} setIsMore={setIsClosedMore} />
    ) : (
      <TodoClosedWarning
        isMore={isClosedMore}
        setIsMore={setIsClosedMore}
        nothing={true}
      />
    )
  ) : undefined;

  const dateControl = (
    <div className="date-control">
      <div className="date">{date}</div>
      <div className="btn-group">
        <ArrowBackIosNew
          fontSize="inherit"
          className="click"
          onClick={() => dispatch(listDateSub())}
          color="inherit"
        />
        <button className="click" onClick={() => dispatch(listDateToday())}>
          오늘
        </button>
        <ArrowForwardIos
          fontSize="inherit"
          className="click"
          onClick={() => dispatch(listDateAdd())}
          color="inherit"
        />
      </div>
    </div>
  );

  return (
    <div className="TodoList">
      {" "}
      <TodoAddBtn date={moment().format("YYYY-MM-DD")} />
      {!isClosedMore && dateControl}
      <div
        className={
          closed === undefined
            ? ""
            : isClosedMore || isSortMore
            ? ""
            : "filter-box"
        }
      >
        {closed}
        {!isClosedMore && (
          <TodoFilter isMore={isSortMore} setIsMore={setIsSortMore} />
        )}
      </div>
      {!isClosedMore && item}
    </div>
  );
}
