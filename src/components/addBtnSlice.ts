import { createSlice } from "@reduxjs/toolkit";

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

export const selectAddBtn = (state: State) => state.addBtn;

export const selectIsAdd = (state: State) => state.addBtn.isAdd;

export default addBtnSlice.reducer;
