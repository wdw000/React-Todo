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
  const [startDate, setStartDate] = useState(props.todo.start_date);
  const [endDate, setEndDate] = useState(props.todo.end_date);

  const dispatch = useDispatch();

  function handleContent(event: React.ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
  }

  function handleImportant(event: React.ChangeEvent<HTMLInputElement>) {
    setImportant(event.target.checked);
  }

  function handleStartDate(event: React.ChangeEvent<HTMLInputElement>) {
    setStartDate(event.target.value);
  }

  function handleEndDate(event: React.ChangeEvent<HTMLInputElement>) {
    setEndDate(event.target.value);
  }

  async function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    interface updateBody {
      todoId: string;
      content: string;
      startDate: string;
      endDate: string;
      important: boolean;
    }

    if (content !== "") {
      const body: updateBody = {
        todoId: props.todo.id,
        content: content,
        startDate: startDate,
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
            startDate,
            endDate,
          })
        );
      }

      props.setIsEdit();
    } else {
      return;
    }
  }

  return (
    <div className="TodoEdit">
      <form
        onSubmit={(event: React.ChangeEvent<HTMLFormElement>) =>
          handleSubmit(event)
        }
      >
        <div className="edit-top">
          <input
            type="text"
            id="content"
            value={content}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleContent(event)
            }
          />
          <div>
            <label htmlFor="important">중요</label>
            <input
              type="checkbox"
              id="important"
              checked={important}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleImportant(event)
              }
            />
          </div>
        </div>

        <div className="edit-bot">
          <div>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleStartDate(event)
              }
            />
            <span> ~ </span>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleEndDate(event)
              }
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
