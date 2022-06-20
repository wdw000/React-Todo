import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface AddBtn {
  isAdd: boolean;
}

const initialState: AddBtn = {
  isAdd: false,
};

export const addBtnSlice = createSlice({
  name: "addBtn",
  initialState,
  reducers: {
    changeIsAdd: (state) => {
      const addBtn = state;

      addBtn.isAdd = !state.isAdd;
    },
  },
});

export const { changeIsAdd } = addBtnSlice.actions;

export const selectAddBtn = (state: RootState) => state.addBtn;

export const selectIsAdd = (state: RootState) => state.addBtn.isAdd;

export default addBtnSlice.reducer;
