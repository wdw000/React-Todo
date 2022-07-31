import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { RootState } from "../../app/store";

export interface asyncInitial<T> {
  items: T[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
  date: {
    list: string;
    calendar: string;
  };
  order: {
    filter: "all" | "incompleted" | "completed";
    latest: boolean;
    isStart: boolean;
    important: boolean;
  };
}

export interface Todo {
  id: string;
  content: string;
  completed: boolean;
  important: boolean;
  start_date: string;
  end_date: string;
  timestamp: string;
}

const initialState: asyncInitial<Todo> = {
  items: [],
  status: "idle",
  error: null,
  date: {
    calendar: moment().format("YYYY-MM"),
    list: moment().format("YYYY-MM-DD"),
  },
  order: {
    filter: "all",
    latest: true,
    isStart: true,
    important: true,
  },
};

export const fetchTodos = createAsyncThunk(
  "todo/fetchTodos",
  async (uid: string) => {
    const res = await fetch(`${process.env.REACT_APP_BACK_URL}/todo/${uid}`, {
      method: "GET",
    });

    const result = await res.json();
    return result;
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setIdelFetchTodos: (state) => {
      state.status = "idle";
      state.items = [];
    },

    todoAdded: (state, action) => {
      state.items.unshift(action.payload);
    },

    todoUpdated: (state, action) => {
      const { id, content, important, endDate } = action.payload;
      const existingTodo = state.items.find((todo) => todo.id === id);

      if (existingTodo) {
        existingTodo.content = content;
        existingTodo.important = important;
        existingTodo.end_date = endDate;
      }
    },

    todoDeleted: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },

    todoCompleted: (state, action) => {
      const id = action.payload;
      const existingTodo = state.items.find((todo) => todo.id === id);

      if (existingTodo) {
        existingTodo.completed = !existingTodo.completed;
      }
    },

    listDateAdd: (state) => {
      const addDate = moment(state.date.list).add(1, "days").toDate();
      state.date.list = moment(addDate).format("YYYY-MM-DD");
    },

    listDateSub: (state) => {
      const subDate = moment(state.date.list).subtract(1, "days").toDate();
      state.date.list = moment(subDate).format("YYYY-MM-DD");
    },

    listDateToday: (state) => {
      state.date.list = moment().format("YYYY-MM-DD");
    },

    changeFilter: (state, action) => {
      state.order.filter = action.payload;
    },

    changeLatest: (state, action) => {
      state.order.latest = action.payload;
    },

    changeIsStart: (state, action) => {
      state.order.isStart = action.payload;
    },

    changeImportant: (state) => {
      state.order.important = !state.order.important;
    },

    calendarMonthAdd: (state) => {
      const addMonth = moment(state.date.calendar).add(1, "month").toDate();
      state.date.calendar = moment(addMonth).format("YYYY-MM");
    },

    calendarMonthSub: (state) => {
      const subMonth = moment(state.date.calendar)
        .subtract(1, "month")
        .toDate();
      state.date.calendar = moment(subMonth).format("YYYY-MM");
    },

    calendarMonthToday: (state) => {
      state.date.calendar = moment().format("YYYY-MM");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.concat(action.payload);
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectFetchTodosStatus = (state: RootState) => state.todo.status;

export const selectAllTodos = (state: RootState) => state.todo.items;

export const selectListTodos = (state: RootState) =>
  state.todo.items.filter((item) => item.end_date >= state.todo.date.list);

export const selectListDate = (state: RootState) => state.todo.date.list;

export const selectCalendarDate = (state: RootState) =>
  state.todo.date.calendar;

export const selectOrder = (state: RootState) => state.todo.order;

export const selectMonthTodos = (state: RootState) =>
  state.todo.items.filter(
    (item) => state.todo.date.calendar === item.start_date.slice(0, 7)
  );

export function selectDateTodos(date: string | undefined) {
  const item = (state: RootState) =>
    state.todo.items.filter((item) => item.end_date === date);

  return item;
}

export const selectCloseTodos = (state: RootState) =>
  state.todo.items.filter(
    (item) =>
      item.end_date < moment().format("YYYY-MM-DD") && item.completed === false
  );

export const {
  setIdelFetchTodos,
  todoAdded,
  todoUpdated,
  todoDeleted,
  todoCompleted,
  listDateAdd,
  listDateSub,
  listDateToday,
  changeFilter,
  changeLatest,
  changeIsStart,
  changeImportant,
  calendarMonthAdd,
  calendarMonthSub,
  calendarMonthToday,
} = todoSlice.actions;

export default todoSlice.reducer;
