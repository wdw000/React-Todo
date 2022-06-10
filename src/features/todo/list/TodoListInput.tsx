import React, { useState } from "react";
import "./TodoListInput.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUid } from "../../login/loginSlice";
import { changeIsAdd } from "../../../components/addBtnSlice";

export default function TodoListInput() {
  const [content, setContent] = useState("");
  const [important, setImportant] = useState(false);
  const uid = useSelector(selectUid);
  const dispatch = useDispatch();

  function handleContentChange(event: React.ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
  }

  function handleImportant(event: React.ChangeEvent<HTMLInputElement>) {
    setImportant(event.target.checked);
  }

  function handleCloseBtn() {
    dispatch(changeIsAdd());
  }

  async function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    const postBody = JSON.stringify({
      uid: uid,
      content: content,
      end_date: new Date().toISOString().slice(0, 10),
      startDate: new Date().toISOString().slice(0, 10),
      important: important,
    });

    await fetch(`${process.env.REACT_APP_BACK_URL}/todo/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: postBody,
    });

    setContent("");
    setImportant(false);
  }

  return (
    <div>
      <button className="click" onClick={() => handleCloseBtn()}>
        close
      </button>
      <form
        onSubmit={(event: React.ChangeEvent<HTMLFormElement>) =>
          handleSubmit(event)
        }
        className="TodoListInput"
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

        <button type="submit" className="click">
          저장
        </button>
      </form>
    </div>
  );
}
