import { parseInt } from "lodash";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Todo, todoDeleted } from "../todoSlice";
import TodoEdit from "./TodoEdit";
import "./TodoItem.css";

interface itemProps {
  todo: Todo;
}

const TodoItem = (props: itemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  let item: JSX.Element;

  const end = props.todo.end_date.split("-").map((test) => parseInt(test));
  const today = moment()
    .format()
    .split("-")
    .map((a) => parseInt(a));

  const remaining = end[2] - today[2];
  const remainDate = remaining === 0 ? "D-day" : `D-${remaining}`;

  function handleIsEdit() {
    setIsEdit(!isEdit);
  }

  async function handleDelete() {
    const respone = await fetch(
      `${process.env.REACT_APP_BACK_URL}/todo/${props.todo.id}`,
      {
        method: "DELETE",
      }
    );

    if (respone.status === 200) {
      dispatch(todoDeleted(props.todo.id));
    }
  }

  if (!isEdit) {
    item = (
      <div className="TodoItem">
        <div className="top">
          <p>{props.todo.content}</p>
          <div>{props.todo.important.toString()}</div>
        </div>
        <div className="bottom">
          <div className="dates">{remainDate}</div>
          <div className="right">
            <button onClick={() => handleIsEdit()}>EDIT</button>
            <button onClick={() => handleDelete()}>REMOVE</button>
          </div>
        </div>
      </div>
    );
  } else {
    item = <TodoEdit setIsEdit={handleIsEdit} todo={props.todo} />;
  }
  return <div>{item}</div>;
};

export default TodoItem;
