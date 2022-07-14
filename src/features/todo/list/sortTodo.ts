import moment from "moment";
import { asyncInitial, Todo } from "../todoSlice";

export function sortTodo(data: Todo[], order: asyncInitial<Todo>["order"]) {
  let todos: Todo[];

  function compareStartDate(a: Todo, b: Todo) {
    if (a.start_date === b.start_date) {
      return moment(b.timestamp).diff(a.timestamp);
    } else {
      return moment(b.start_date).diff(a.start_date);
    }
  }

  function compareEndDate(a: Todo, b: Todo) {
    if (a.end_date === b.end_date) {
      return moment(b.timestamp).diff(a.timestamp);
    } else {
      return moment(b.end_date).diff(a.end_date);
    }
  }

  if (order.important) {
    const important = data.filter((item) => item.important === true);
    const trivial = data.filter((item) => item.important === false);

    if (order.latest) {
      if (order.isStart) {
        important.sort((a, b) => compareStartDate(a, b));
        trivial.sort((a, b) => compareStartDate(a, b));
      } else {
        important.sort((a, b) => compareEndDate(a, b));
        trivial.sort((a, b) => compareEndDate(a, b));
      }
    } else {
      if (order.isStart) {
        important.sort((a, b) => compareStartDate(b, a));
        trivial.sort((a, b) => compareStartDate(b, a));
      } else {
        important.sort((a, b) => compareEndDate(b, a));
        trivial.sort((a, b) => compareEndDate(b, a));
      }
    }

    todos = [...important, ...trivial];
  } else {
    if (order.latest) {
      if (order.isStart) {
        data.sort((a, b) => compareStartDate(a, b));
      } else {
        data.sort((a, b) => compareEndDate(a, b));
      }
    } else {
      if (order.isStart) {
        data.sort((a, b) => compareStartDate(b, a));
      } else {
        data.sort((a, b) => compareEndDate(b, a));
      }
    }

    todos = data;
  }

  return todos;
}
