import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

interface chart {
  listCnt: number;
}

const initialState: chart = {
  listCnt: 7,
};

export const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    addListCnt: (state) => {
      state.listCnt = state.listCnt + 1;
    },
    subListCnt: (state) => {
      state.listCnt = state.listCnt - 1;
    },
    changeListCnt: (state, actions) => {
      state.listCnt = actions.payload;
    },
  },
});

export const selectListCnt = (state: RootState) => state.chart.listCnt;

export const { addListCnt, subListCnt, changeListCnt } = chartSlice.actions;

export default chartSlice.reducer;
