import { createSlice } from "@reduxjs/toolkit";

const initData = [];

export const componentNumberSlice = createSlice({
  name: "componentNumber",
  initialState: {
    data: initData,
  },
  reducers: {
    resetData: (state) => {
      state.data = initData;
    },

    //action is {index, componentNumber: {videoNumber, documentNumber, quizNumber}}
    changeComponentNumber: (state, action) => {
      const { index, componentNumber } = action.payload;

      if (index < state.data.length) {
        state.data[index] = componentNumber;
      }
    },

    changeData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { resetData, changeComponentNumber, changeData} =
  componentNumberSlice.actions;

export default componentNumberSlice.reducer;
