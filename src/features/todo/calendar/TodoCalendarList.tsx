import React from "react";
import { useSelector } from "react-redux";
import TodoAddBtn from "../../../components/TodoAddBtn";
import TodoItem from "../../../components/TodoItem";
import { selectDateTodos } from "../todoSlice";

interface props {
  date: string | null;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TodoCalendarList(props: props) {
  const thisTodos = useSelector(selectDateTodos(props.date));

  function handleClose() {
    props.setIsClick(false);
  }

  const item = thisTodos.map((item) => <TodoItem todo={item} key={item.id} />);

  return (
    <div className="TodoCalendarList">
      <div className="close click" onClick={() => handleClose()}>
        close
      </div>
      {item}
      <TodoAddBtn />
    </div>
  );
}
