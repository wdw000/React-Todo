import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFilter,
  changeImportant,
  changeIsStart,
  changeLatest,
  listDateAdd,
  listDateSub,
  listDateToday,
  selectListDate,
} from "../todoSlice";
import "./TodoFilter.css";

export function TodoFilter() {
  const dispatch = useDispatch();
  const [isSort, setIsSort] = useState(false);
  const date = useSelector(selectListDate).slice(2);

  function handleAddDateBtn() {
    dispatch(listDateAdd());
  }

  function handleSubDateBtn() {
    dispatch(listDateSub());
  }

  function handleTodayDateBtn() {
    dispatch(listDateToday());
  }

  function handleSortBtn() {
    setIsSort(!isSort);
  }

  const sort = (
    <div className="sort-list">
      <ul className="completed-filter">
        <li className="click" onClick={() => dispatch(changeFilter("all"))}>
          전체
        </li>
        <li
          className="click"
          onClick={() => dispatch(changeFilter("incompleted"))}
        >
          진행
        </li>
        <li
          className="click"
          onClick={() => dispatch(changeFilter("completed"))}
        >
          완료
        </li>
      </ul>
      <span>|</span>
      <ul className="timestamp-filter">
        <li className="click" onClick={() => dispatch(changeLatest(true))}>
          최신순
        </li>
        <li className="click" onClick={() => dispatch(changeLatest(false))}>
          오래된순
        </li>
      </ul>
      <span>|</span>
      <ul className="date-filter">
        <li className="click" onClick={() => dispatch(changeIsStart(true))}>
          시작일순
        </li>
        <li className="click" onClick={() => dispatch(changeIsStart(false))}>
          마감일순
        </li>
      </ul>
      <span>|</span>
      <ul className="important-filter">
        <li className="click" onClick={() => dispatch(changeImportant())}>
          중요도순
        </li>
      </ul>
    </div>
  );

  const item = (
    <div className="date-control">
      <button
        className="date-sub click"
        type="button"
        onClick={() => handleSubDateBtn()}
      >
        &lt;
      </button>
      <button
        type="button"
        className="click"
        onClick={() => handleTodayDateBtn()}
      >
        {date}
      </button>
      <button
        className="date-plus click"
        type="button"
        onClick={() => handleAddDateBtn()}
      >
        &gt;
      </button>
    </div>
  );

  return (
    <div className="TodoFilter">
      {isSort ? sort : item}
      <div className="sort-box click" onClick={() => handleSortBtn()}>
        <span>
          <span>&lt;</span> 정렬
        </span>
      </div>
    </div>
  );
}
