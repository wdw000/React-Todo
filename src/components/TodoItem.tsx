import moment from "moment";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Todo, todoCompleted, todoDeleted } from "../features/todo/todoSlice";
import TodoEdit from "./TodoEdit";
import "./TodoItem.css";

interface itemProps {
  todo: Todo;
}

const TodoItem = (props: itemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  let item: JSX.Element;

  const remaining = Math.ceil(
    moment(props.todo.end_date).diff(moment(), "days", true)
  );

  const remainDate =
    remaining === 0 ? "D-day" : remaining > 0 ? `D-${remaining}` : `마감`;

  function handleIsEdit() {
    setIsEdit(!isEdit);
  }

  async function handleItemClick(event: any) {
    if (event.target.tagName !== "BUTTON") {
      const respone = await fetch(
        `${process.env.REACT_APP_BACK_URL}/todo/${props.todo.id}`,
        {
          method: "PUT",
        }
      );

      if (respone.status === 200) {
        dispatch(todoCompleted(props.todo.id));
      }
    }
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
      <div
        className={
          props.todo.completed ? "TodoItem done click" : "TodoItem click"
        }
        onClick={(event) => handleItemClick(event)}
      >
        <div className="top">
          <p>{props.todo.content}</p>
          <div>{props.todo.important.toString()}</div>
        </div>
        <div className="bottom">
          <div className="dates">
            <div>{remainDate}</div>
            <span>{props.todo.start_date.slice(2)}</span>
            <span> ~ </span>
            <span>{props.todo.end_date.slice(2)}</span>
          </div>
          <div></div>
          <div className="right">
            <button className="edit click" onClick={() => handleIsEdit()}>
              EDIT
            </button>
            <button className="remove click" onClick={() => handleDelete()}>
              REMOVE
            </button>
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
