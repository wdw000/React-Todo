import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

interface Setting {
  isInputClose: boolean;
}

const initialState: Setting = {
  isInputClose: true,
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    changeIsInputClose: (state, actions) => {
      state.isInputClose = actions.payload;
    },
  },
});

export const selectIsInputClose = (state: RootState) =>
  state.setting.isInputClose;

export const { changeIsInputClose } = settingSlice.actions;

export default settingSlice.reducer;
