import moment from "moment";
import React, { useRef, useState } from "react";
import "./TodoCalendar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  calendarMonthAdd,
  calendarMonthSub,
  calendarMonthToday,
  selectCalendarDate,
  selectMonthTodos,
} from "../todoSlice";
import TodoCalendarList from "./TodoCalendarList";
import TodoAddBtn from "../../../components/TodoAddBtn";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

function TodoCalendar() {
  const calendarDate = useSelector(selectCalendarDate);
  const thisMonthTodos = useSelector(selectMonthTodos);
  const dispatch = useDispatch();
  const [clickDate, setClickDate] = useState<undefined | string>(undefined);
  const [isClick, setIsClick] = useState(false);

  const calendarBox = useRef<HTMLDivElement>(null);

  function drawCalendar() {
    const closed = getClosedTodo();
    const proceed = getProceedTodo();
    const completed = getCompletedTodo();

    const preDate = parseInt(
      moment(calendarDate).subtract(1, "month").endOf("month").format("DD")
    );
    const preDay = parseInt(
      moment(calendarDate).subtract(1, "month").endOf("month").format("E")
    );

    const thisDate = parseInt(moment(calendarDate).endOf("month").format("DD"));
    const thisDay = parseInt(moment(calendarDate).endOf("month").format("E"));

    const preDates: number[] = [];
    const thisDates = [...Array(thisDate + 1).keys()].slice(1);
    const nextDates: number[] = [];

    if (preDay !== 6 && preDay !== 7) {
      for (let i = 0; i < preDay + 1; i++) {
        preDates.unshift(preDate - i);
      }
    } else if (preDay === 7) {
      preDates.unshift(preDate);
    }

    if (thisDay !== 7) {
      for (let i = 1; i < 7 - thisDay; i++) {
        nextDates.push(i);
      }
    } else {
      for (let i = 1; i < 7; i++) {
        nextDates.push(i);
      }
    }

    const calendar = [...preDates, ...thisDates, ...nextDates];

    let row: JSX.Element[] = [];
    let rowDiv: JSX.Element | null;
    let calendarDates: JSX.Element[] = [];

    for (let i = 0; i < calendar.length / 7; i++) {
      rowDiv = null;
      row = [];
      let dateStatus: JSX.Element | null;

      for (let j = i * 7; j < i * 7 + 7; j++) {
        const dateBoxClass: string[] = [];
        let dateBoxOnClick = false;
        let dateBox: JSX.Element | null = null;
        dateStatus = null;

        if (j % 7 === 0) {
          dateBoxClass.push("sun");
        }

        if (j % 7 === 6) {
          dateBoxClass.push("sat");
        }

        if (
          j === parseInt(moment().format("D")) + preDates.length - 1 &&
          calendarDate === moment().format("YYYY-MM")
        ) {
          dateBoxClass.push("today");
        }

        if (j < preDates.length || j >= calendar.length - nextDates.length) {
          dateBoxClass.push("not-this-month");
        } else {
          dateBoxClass.push("click");
          dateBoxOnClick = true;
          if (closed.has(calendar[j].toString())) {
            dateStatus = <div className="closed"></div>;
          } else if (proceed.has(calendar[j].toString())) {
            dateStatus = <div className="proceed"></div>;
          } else if (completed.includes(calendar[j].toString())) {
            dateStatus = <div className="completed"></div>;
          }
        }

        if (!dateBoxOnClick) {
          dateBox = (
            <div className={dateBoxClass.join(" ")} key={`not${calendar[j]}`}>
              {calendar[j].toString()}
            </div>
          );
        } else {
          dateBox = (
            <div
              className={dateBoxClass.join(" ")}
              key={`${calendar[j]}`}
              onClick={(e) => handleDateClick(e)}
            >
              {calendar[j].toString()}
              {dateStatus}
            </div>
          );
        }

        row.push(dateBox);
      }
      rowDiv = (
        <div className="row" key={i}>
          {row}
        </div>
      );
      calendarDates.push(rowDiv);
    }

    const calendarDateDiv = <div className="dates">{calendarDates}</div>;

    return calendarDateDiv;
  }

  function getClosedTodo() {
    const items = thisMonthTodos.filter(
      (item) =>
        item.end_date < moment().format("YYYY-MM-DD") &&
        item.completed === false
    );

    const closeDates = items.map((item) => moment(item.end_date).format("D"));
    const set = new Set(closeDates);

    return set;
  }

  function getProceedTodo() {
    const proceedTodos = thisMonthTodos.filter(
      (item) =>
        item.end_date >= moment().format("YYYY-MM-DD") &&
        item.completed === false
    );

    const proceedDates = proceedTodos.map((item) =>
      moment(item.end_date).format("D")
    );
    const set = new Set(proceedDates);

    return set;
  }

  function getCompletedTodo() {
    const todoEndDates = thisMonthTodos.map((item) => item.end_date);
    const todoEndDateSet = new Set(todoEndDates);
    const result: string[] = [];

    todoEndDateSet.forEach((item) => {
      const todos = thisMonthTodos.filter((todo) => todo.end_date === item);
      const todosCompleted = todos.filter((todo) => todo.completed === true);

      if (todos.length === todosCompleted.length) {
        result.push(moment(item).format("D"));
      }
    });

    return result;
  }

  function handleDateClick(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    const date = event.currentTarget.innerText;
    const thisDate =
      date.length === 1
        ? `${calendarDate}-0${date}`
        : `${calendarDate}-${date}`;

    setClickDate(thisDate.slice(0, 10));
    setIsClick(true);
  }

  const calendar = (
    <div className="TodoCalendar">
      <TodoAddBtn date={moment().format("YYYY-MM-DD")} />
      <div className="month-controler">
        <p>{calendarDate}</p>

        <div className="btn-group">
          <ArrowBackIosNew
            className="click"
            fontSize="inherit"
            color="inherit"
            onClick={() => dispatch(calendarMonthSub())}
          />
          <button onClick={() => dispatch(calendarMonthToday())}>오늘</button>
          <ArrowForwardIos
            className="click"
            fontSize="inherit"
            color="inherit"
            onClick={() => dispatch(calendarMonthAdd())}
          />
        </div>
      </div>

      <div className="calendar" ref={calendarBox}>
        <div className="day row">
          <div className="sun">일</div>
          <div>월</div>
          <div>화</div>
          <div>수</div>
          <div>목</div>
          <div>금</div>
          <div className="sat">토</div>
        </div>
      </div>

      {drawCalendar()}
    </div>
  );

  const calendarList = (
    <TodoCalendarList date={clickDate} setIsClick={setIsClick} />
  );

  return <div>{isClick ? calendarList : calendar}</div>;
}

export default TodoCalendar;
