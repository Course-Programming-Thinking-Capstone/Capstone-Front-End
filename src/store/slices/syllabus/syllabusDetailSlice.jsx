import { createSlice } from "@reduxjs/toolkit";
import { getSyllabusByIdAsync } from "../../thunkApis/syllabuses/syllabusesThunk";

const entity = {
  id: 0,
  name: "",
  target: "",
  totalSlot: 0,
  slotTime: 0,
  minQuizScoreRatio: 0,
  sections: [
    {
      id: 0,
      name: "",
    },
  ],
  teacherId: 0,
  courseId: 0
};

export const syllabusDetailSlice = createSlice({
  name: "syllabusDetail",
  initialState: {
    data: entity,
    loading: "idle",
    error: null,
  },
  reducers: {
    resetData: (state) => {
      state.data = entity;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getSyllabusByIdAsync.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(getSyllabusByIdAsync.fulfilled, (state, action) => {
        state.loading = "success";
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getSyllabusByIdAsync.rejected, (state, action) => {
        state.loading = "fail";
        state.error = action.payload;
      });
  },
});

export const { resetData, setData } = syllabusDetailSlice.actions;

export default syllabusDetailSlice.reducer;
