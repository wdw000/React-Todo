import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Todo, todoUpdated } from "../features/todo/todoSlice";
import "./TodoEdit.css";

interface editProps {
  setIsEdit: Function;
  todo: Todo;
}

export default function TodoEdit(props: editProps) {
  const [content, setContent] = useState(props.todo.content);
  const [important, setImportant] = useState(props.todo.important);
  const [endDate, setEndDate] = useState(props.todo.end_date);

  const dispatch = useDispatch();

  function handleContent(event: React.ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
  }

  function handleImportant(event: React.ChangeEvent<HTMLInputElement>) {
    setImportant(event.target.checked);
  }

  function handleEndDate(event: React.ChangeEvent<HTMLInputElement>) {
    setEndDate(event.target.value);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    interface updateBody {
      todoId: string;
      content: string;
      endDate: string;
      important: boolean;
    }

    if (content !== "") {
      const body: updateBody = {
        todoId: props.todo.id,
        content: content,
        endDate: endDate,
        important: important,
      };

      const respone = await fetch(`${process.env.REACT_APP_BACK_URL}/todo`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(body),
      });

      if (respone.status === 200) {
        dispatch(
          todoUpdated({
            id: props.todo.id,
            content,
            important,
            endDate,
          })
        );
      }

      props.setIsEdit();
    } else {
      // 업데이트 실패 시
      return;
    }
  }

  return (
    <div className="TodoEdit">
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="edit-top">
          <input
            type="text"
            id="content"
            value={content}
            onChange={(event) => handleContent(event)}
          />
          <div>
            <label htmlFor="important">중요</label>
            <input
              type="checkbox"
              id="important"
              checked={important}
              onChange={(event) => handleImportant(event)}
            />
          </div>
        </div>

        <div className="edit-bot">
          <div>
            <label htmlFor="endDate">마감일 </label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(event) => handleEndDate(event)}
            />
          </div>

          <div>
            <button type="button" onClick={() => props.setIsEdit()}>
              CANCEL
            </button>
            <button type="submit">UPDATE</button>
          </div>
        </div>
      </form>
    </div>
  );
}
