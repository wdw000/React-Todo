import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { selectUid } from "../features/login/loginSlice";
import { Todo, todoAdded } from "../features/todo/todoSlice";
import "./TodoInput.css";
import { changeIsInputClose, selectIsInputClose } from "./settingSlice";
import { Close } from "@mui/icons-material";

interface InputProps {
  setIsAdd: Function;
  date: string | undefined;
}

export default function TodoInput(props: InputProps) {
  const [content, setContent] = useState("");
  const [important, setImportant] = useState(false);
  const [endDate, setEndDate] = useState(props.date);
  const uid = useSelector(selectUid);
  const isInputClose = useSelector(selectIsInputClose);
  const dispatch = useDispatch();

  const contentBox = useRef<HTMLTextAreaElement>(null);

  console.log(props.date);

  function handleContentChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
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

  function handleInputClose(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(changeIsInputClose(event.target.checked));
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

      if (isInputClose) {
        props.setIsAdd();
      }

      dispatch(todoAdded(todo));
      setContent("");
      setEndDate(props.date);
      setImportant(false);
    }
  }

  useEffect(() => {
    if (contentBox.current) {
      contentBox.current.style.height = `1px`;
      contentBox.current.style.height = `${
        12 + contentBox.current.scrollHeight
      }px`;
    }
  });

  useEffect(() => {
    document.body.style.cssText = `
    position: fixed;
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  });

  return (
    <div className="input-wrap">
      <div className="graybox"></div>
      <div className="TodoListInput">
        <div className="top-menu">
          <Close className="click" onClick={() => handleCloseBtn()} />
          <div>
            <label htmlFor="closeCheck">저장 후 창 닫기</label>
            <input
              type="checkbox"
              id="closeCheck"
              onChange={(e) => handleInputClose(e)}
              checked={isInputClose}
            />
          </div>
        </div>

        <form
          onSubmit={(event: React.ChangeEvent<HTMLFormElement>) =>
            handleSubmit(event)
          }
        >
          <div>
            <textarea
              id="content"
              placeholder="할일을 입력해주세요."
              value={content}
              onChange={(event) => handleContentChange(event)}
              ref={contentBox}
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
    </div>
  );
}
