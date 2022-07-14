import React from "react";
import { useSelector } from "react-redux";
import TodoAddBtn from "../../../components/TodoAddBtn";
import { TodoFilter } from "../../../components/TodoFilter";
import TodoItem from "../../../components/TodoItem";
import { sortTodo } from "../list/sortTodo";
import { selectDateTodos, selectOrder, Todo } from "../todoSlice";

interface props {
  date: string;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TodoCalendarList(props: props) {
  const thisTodos = useSelector(selectDateTodos(props.date));
  const order = useSelector(selectOrder);

  function handleClose() {
    props.setIsClick(false);
  }

  let filterTodos: Todo[] = [];

  switch (order.filter) {
    case "all":
      filterTodos = thisTodos;
      break;
    case "completed":
      filterTodos = thisTodos.filter((todo) => todo.completed === true);
      break;
    case "incompleted":
      filterTodos = thisTodos.filter((todo) => todo.completed === false);
      break;
  }

  const data = sortTodo(filterTodos, order);
  const item = data.map((item) => <TodoItem todo={item} key={item.id} />);

  return (
    <div className="TodoCalendarList">
      <div>
        <div>{props.date}</div>
        <div className="close click" onClick={() => handleClose()}>
          close
        </div>
      </div>
      <TodoFilter />
      {item}
      <TodoAddBtn date={props.date} />
    </div>
  );
}
