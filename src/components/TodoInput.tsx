import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { selectUid } from "../features/login/loginSlice";
import { Todo, todoAdded } from "../features/todo/todoSlice";
import "./TodoInput.css";

interface InputProps {
  setIsAdd: Function;
  date: string;
}

export default function TodoInput(props: InputProps) {
  const [content, setContent] = useState("");
  const [important, setImportant] = useState(false);
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));
  const uid = useSelector(selectUid);
  const dispatch = useDispatch();

  function handleContentChange(event: React.ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
  }

  function handleImportant(event: React.ChangeEvent<HTMLInputElement>) {
    setImportant(event.target.checked);
  }

  function handleEndDate(event: React.ChangeEvent<HTMLInputElement>) {
    setEndDate(event.target.value);
  }

  function handleCloseBtn() {
    props.setIsAdd();
  }

  async function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    const postBody = JSON.stringify({
      uid: uid,
      content: content,
      end_date: endDate,
      startDate: moment().format("YYYY-MM-DD"),
      important: important,
    });

    const respone = await fetch(`${process.env.REACT_APP_BACK_URL}/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: postBody,
    });

    if (respone.status === 201) {
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
      setEndDate(moment().format("YYYY-MM-DD"));
      setImportant(false);
    }
  }

  return (
    <div className="TodoListInput">
      <div className="top-menu">
        <button className="click" onClick={() => handleCloseBtn()}>
          X
        </button>
        <div>
          <label htmlFor="closeCheck">저장 후 창 닫기</label>
          <input type="checkbox" id="closeCheck" />
        </div>
      </div>

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
          <label htmlFor="end">마감일</label>
          <input
            type="date"
            id="end"
            value={props.date}
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
