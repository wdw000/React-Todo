import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./app/store";

interface Setting {
  isInputClose: boolean;
}

const initialState: Setting = {
  isInputClose: true,
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {},
});

export const selectIsInputClose = (state: RootState) =>
  state.setting.isInputClose;

export default settingSlice.reducer;
