import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import { RootState } from "../../app/store";

interface asyncInitial<T> {
  items: T[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
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
    todoAdded: (state, action) => {
      state.items.push(action.payload);
    },
    todoUpdated: (state, action) => {
      const { id, content, important, startDate, endDate } = action.payload;
      const existingTodo = state.items.find((todo) => todo.id === id);

      if (existingTodo) {
        existingTodo.content = content;
        existingTodo.important = important;
        existingTodo.start_date = startDate;
        existingTodo.end_date = endDate;
      }
    },
    todoDeleted: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
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

export const selectTodayTodos = (state: RootState) =>
  state.todo.items.filter(
    (item) => item.end_date >= moment().format().slice(0, 10)
  );
export const { todoAdded, todoUpdated, todoDeleted } = todoSlice.actions;

export default todoSlice.reducer;
