import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Todo, todoCompleted, todoDeleted } from "../features/todo/todoSlice";
import TodoEdit from "./TodoEdit";
import "./TodoItem.css";
import star from "../img/star.svg";
import starOutLine from "../img/star_outline.svg";

interface itemProps {
  todo: Todo;
}

const TodoItem = (props: itemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [more, setMore] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const dispatch = useDispatch();

  const remaining = Math.ceil(
    moment(props.todo.end_date).diff(moment(), "days", true)
  );

  const remainDate =
    remaining === 0 ? "D-day" : remaining > 0 ? `D-${remaining}` : `마감`;

  const contextBox = useRef<HTMLDivElement>(null);
  const context = useRef<HTMLParagraphElement>(null);

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

  function handleMoreBtn() {
    setIsMore(!isMore);
  }

  useEffect(() => {
    if (contextBox.current && context.current) {
      if (context.current.scrollWidth > context.current.clientWidth) {
        setMore(true);
      } else {
        setMore(false);
      }
    }

    window.addEventListener("resize", () => {
      if (contextBox.current && context.current) {
        if (context.current.scrollWidth > context.current.clientWidth) {
          setMore(true);
        } else {
          setMore(false);
        }
      }
    });
  }, [setMore]);

  const moreBtn = <button onClick={() => handleMoreBtn()}>더보기</button>;
  const simplyBtn = <button onClick={() => handleMoreBtn()}>간략히</button>;

  const item = (
    <div
      className={
        props.todo.completed ? "TodoItem done click" : "TodoItem click"
      }
      onClick={(event) => handleItemClick(event)}
    >
      <div className="top">
        <div
          className={
            more
              ? isMore
                ? "context-box more"
                : "context-box simply"
              : "context-box"
          }
          ref={contextBox}
        >
          <p
            className={
              more ? (isMore ? "context more" : "context simply") : "context"
            }
            ref={context}
          >
            {props.todo.content}
          </p>
          {more ? (isMore ? simplyBtn : moreBtn) : ""}
        </div>

        <div className="important">
          <img
            src={props.todo.important ? star : starOutLine}
            alt="important"
          />
        </div>
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

  return (
    <div>
      {!isEdit ? item : <TodoEdit setIsEdit={handleIsEdit} todo={props.todo} />}
    </div>
  );
};

export default TodoItem;