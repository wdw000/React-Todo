import React, { useState } from "react";
import "./TodoListInput.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUid } from "../../login/loginSlice";
import { changeIsAdd } from "../../../components/addBtnSlice";
import { Todo, todoAdded } from "../todoSlice";
import moment from "moment";

export default function TodoListInput() {
  const [content, setContent] = useState("");
  const [important, setImportant] = useState(false);
  const [startDate, setStartDate] = useState(moment().format().slice(0, 10));
  const [endDate, setEndDate] = useState(moment().format().slice(0, 10));
  const uid = useSelector(selectUid);
  const dispatch = useDispatch();

  function handleContentChange(event: React.ChangeEvent<HTMLInputElement>) {
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

  function handleCloseBtn() {
    dispatch(changeIsAdd());
  }

  async function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    const postBody = JSON.stringify({
      uid: uid,
      content: content,
      end_date: endDate,
      startDate: startDate,
      important: important,
    });

    const respone = await fetch(`${process.env.REACT_APP_BACK_URL}/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: postBody,
    });

    const result = await respone.json();
    const todo: Todo = {
      id: result.id,
      completed: result.completed,
      content: result.content,
      important: result.important,
      start_date: result.start_date,
      end_date: result.end_date,
      timestamp: result.timestamp,
    };

    dispatch(todoAdded(todo));
    setContent("");
    setStartDate(moment().format().slice(0, 10));
    setEndDate(moment().format().slice(0, 10));
    setImportant(false);
  }

  return (
    <div className="TodoListInput">
      <button className="click" onClick={() => handleCloseBtn()}>
        close
      </button>

      <form
        onSubmit={(event: React.ChangeEvent<HTMLFormElement>) =>
          handleSubmit(event)
        }
      >
        <div>
          <input
            type="text"
            id="content"
            placeholder="할일을 입력해주세요."
            value={content}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleContentChange(event)
            }
          />
          <div>
            <label htmlFor="important">중요</label>
            <input
              type="checkbox"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleImportant(event)
              }
              checked={important}
            />
          </div>
        </div>

        <div>
          <input
            type="date"
            id="start"
            value={startDate}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleStartDate(event)
            }
          />
          <span>~</span>
          <input
            type="date"
            id="end"
            value={endDate}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleEndDate(event)
            }
          />
        </div>

        <button type="submit" className="click">
          저장
        </button>
      </form>
    </div>
  );
}
