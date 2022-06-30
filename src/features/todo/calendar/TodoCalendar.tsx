import moment from "moment";
import React, { useEffect } from "react";
import "./TodoCalendar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  calendarMonthAdd,
  calendarMonthSub,
  calendarMonthToday,
  selectCalendarDate,
  selectMothTodos,
} from "../todoSlice";

function TodoCalendar() {
  const calendarDate = useSelector(selectCalendarDate);
  const thisMonthTodos = useSelector(selectMothTodos);
  const dispatch = useDispatch();

  function drawCalendar() {
    const calendarBox = document.querySelector(".TodoCalendar > .calendar");
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

    const calendarDateBox = document.createElement("div");
    calendarDateBox.classList.add("dates");

    for (let i = 0; i < calendar.length / 7; i++) {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("row");
      for (let j = i * 7; j < i * 7 + 7; j++) {
        const dateBox = document.createElement("div");
        const date = document.createTextNode(calendar[j].toString());
        dateBox.classList.add(`date-${calendar[j]}`);
        if (j % 7 === 0) {
          dateBox.classList.add("sun");
        }

        if (j % 7 === 6) {
          dateBox.classList.add("sat");
        }

        if (
          j === parseInt(moment().format("D")) + preDates.length - 1 &&
          calendarDate === moment().format("YYYY-MM")
        ) {
          dateBox.classList.add("today");
          dateBox.appendChild(date);
        } else {
          dateBox.appendChild(date);
        }

        if (j < preDates.length || j >= calendar.length - nextDates.length) {
          dateBox.classList.add("not-this-month");
        }

        rowDiv.appendChild(dateBox);
      }
      calendarDateBox.appendChild(rowDiv);
    }

    calendarBox?.appendChild(calendarDateBox);
  }

  function removeCalendar() {
    const calendar = document.querySelector(".TodoCalendar .dates");
    calendar?.remove();
  }

  function drawClosedTodo() {
    const items = thisMonthTodos.filter(
      (item) =>
        item.end_date < moment().format("YYYY-MM-DD") &&
        item.completed === false
    );

    const closeDates = items.map((item) => moment(item.end_date).format("D"));
    const set = new Set(closeDates);

    set.forEach((item) => {
      const closeWarningBox = document.createElement("div");
      const closeDateBox = document.querySelector(
        `.TodoCalendar .dates .date-${item}:not(.not-this-month)`
      );
      closeWarningBox.classList.add("closed");
      closeDateBox?.appendChild(closeWarningBox);
    });
  }

  function drawproceedTodo() {
    const proceedTodos = thisMonthTodos.filter(
      (item) =>
        item.end_date >= moment().format("YYYY-MM-DD") &&
        item.completed === false
    );

    const proceedDates = proceedTodos.map((item) =>
      moment(item.end_date).format("D")
    );
    const set = new Set(proceedDates);

    set.forEach((item) => {
      const proceedBox = document.createElement("div");
      const proceedDateBox = document.querySelector(
        `.TodoCalendar .dates .date-${item}:not(.not-this-month)`
      );

      proceedBox.classList.add("proceed");
      proceedDateBox?.appendChild(proceedBox);
    });
  }

  function handleDateClick() {}

  useEffect(() => {
    removeCalendar();
    drawCalendar();
    drawClosedTodo();
    drawproceedTodo();
  });

  return (
    <div className="TodoCalendar">
      <div className="month-controler">
        <div>{calendarDate}</div>

        <div className="btn-group">
          <button onClick={() => dispatch(calendarMonthSub())}>&lt;</button>
          <button onClick={() => dispatch(calendarMonthToday())}>오늘</button>
          <button onClick={() => dispatch(calendarMonthAdd())}>&gt;</button>
        </div>
      </div>

      <div className="calendar">
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
    </div>
  );
}

export default TodoCalendar;
