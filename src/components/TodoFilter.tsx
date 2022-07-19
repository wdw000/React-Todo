import { Close, Sort } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFilter,
  changeImportant,
  changeIsStart,
  changeLatest,
  selectOrder,
} from "../features/todo/todoSlice";
import "./TodoFilter.css";

interface FilterProps {
  isMore?: boolean;
  setIsMore?: Function;
}

export function TodoFilter(props: FilterProps) {
  const dispatch = useDispatch();
  const [isSort, setIsSort] = useState(false);

  const order = useSelector(selectOrder);

  function handleSortBtn() {
    setIsSort(!isSort);
    if (props.setIsMore !== undefined && props.isMore !== undefined) {
      props.setIsMore(!props.isMore);
    }
  }

  const sortList = (
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
      <div className="sort-box">
        {!isSort ? (
          <Sort className="click sort-btn" onClick={() => handleSortBtn()} />
        ) : (
          <Close className="click sort-btn" onClick={() => handleSortBtn()} />
        )}
        {isSort === true && sortList}
      </div>
    </div>
  );
}
