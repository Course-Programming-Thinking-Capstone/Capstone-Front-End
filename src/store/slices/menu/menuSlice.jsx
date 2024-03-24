import { createSlice } from "@reduxjs/toolkit";

const initData = {
  teacherActiveMenu: "notification",
};

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    data: initData,
  },
  reducers: {
    resetData: (state) => {
      state.data = initData;
    },
    changeTeacherActiveMenu: (state, action) => {
      state.data.teacherActiveMenu = action.payload.teacherActiveMenu;
    },
  },
});

export const { resetData, changeTeacherActiveMenu } = menuSlice.actions;

export default menuSlice.reducer;
