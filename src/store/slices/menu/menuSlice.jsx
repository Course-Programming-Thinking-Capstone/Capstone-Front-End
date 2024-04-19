import { createSlice } from "@reduxjs/toolkit";

const initData = {
  teacherActiveMenu: "notification",
  adminActiveMenu: "Game"
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
    changeAdminActiveMenu: (state, action) => {
      state.data.adminActiveMenu = action.payload.adminActiveMenu;
    }
  },
});

export const { resetData, changeTeacherActiveMenu, changeAdminActiveMenu } = menuSlice.actions;

export default menuSlice.reducer;
