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
  selectOrder,
} from "../todoSlice";
import "./TodoFilter.css";

export function TodoFilter() {
  const dispatch = useDispatch();
  const [isSort, setIsSort] = useState(false);
  const date = useSelector(selectListDate).slice(2);
  const order = useSelector(selectOrder);

  function handleSortBtn() {
    setIsSort(!isSort);
  }

  const sort = (
    <div className="sort-list">
      <ul className="completed-filter">
        <li
          className={"click " + (order.filter === "all" && "on")}
          onClick={() => dispatch(changeFilter("all"))}
        >
          전체
        </li>
        <li
          className={"click " + (order.filter === "incompleted" && "on")}
          onClick={() => dispatch(changeFilter("incompleted"))}
        >
          진행
        </li>
        <li
          className={"click " + (order.filter === "completed" && "on")}
          onClick={() => dispatch(changeFilter("completed"))}
        >
          완료
        </li>
      </ul>

      <ul className="timestamp-filter">
        <li
          className={"click " + (order.latest === true && "on")}
          onClick={() => dispatch(changeLatest(true))}
        >
          최신순
        </li>
        <li
          className={"click " + (order.latest === false && "on")}
          onClick={() => dispatch(changeLatest(false))}
        >
          오래된순
        </li>
      </ul>

      <ul className="date-filter">
        <li
          className={"click " + (order.isStart === true && "on")}
          onClick={() => dispatch(changeIsStart(true))}
        >
          시작일순
        </li>
        <li
          className={"click " + (order.isStart === false && "on")}
          onClick={() => dispatch(changeIsStart(false))}
        >
          마감일순
        </li>
      </ul>

      <ul className="important-filter">
        <li
          className={"click " + (order.important === true && "on")}
          onClick={() => dispatch(changeImportant())}
        >
          중요도순
        </li>
      </ul>
    </div>
  );

  return (
    <div className="TodoFilter">
      <div className="date-control">
        <div className="date">{date}</div>
        <div className="btn-group">
          <button className="click" onClick={() => dispatch(listDateSub())}>
            &lt;
          </button>
          <button className="click" onClick={() => dispatch(listDateToday())}>
            오늘
          </button>
          <button className="click" onClick={() => dispatch(listDateAdd())}>
            &gt;
          </button>
        </div>
      </div>

      <div className="sort-box click">
        <span onClick={() => handleSortBtn()}>
          정렬<span className="extand off">&lt;</span>
        </span>
        {isSort === true && sort}
      </div>
    </div>
  );
}
