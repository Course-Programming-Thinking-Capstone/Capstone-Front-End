import { createSlice } from "@reduxjs/toolkit";
import {
  filterSyllabusesAsync,
  filterTeacherSyllabusesAsync,
} from "../../thunkApis/syllabuses/syllabusesThunk";

const initData = {
  totalPages: 0,
  totalRecords: 0,
  results: [],
};

export const syllabusesSlice = createSlice({
  name: "syllabuses",
  initialState: {
    data: initData,
    loading: "idle",
    error: {},
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(filterSyllabusesAsync.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(filterSyllabusesAsync.fulfilled, (state, action) => {
        state.loading = "success";
        state.error = null;
        state.data = action.payload;
      })
      .addCase(filterSyllabusesAsync.rejected, (state, action) => {
        state.loading = "fail";
        state.error = action.payload;
      })
      .addCase(filterTeacherSyllabusesAsync.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(filterTeacherSyllabusesAsync.fulfilled, (state, action) => {
        state.loading = "success";
        state.error = null;
        state.data = action.payload;
      })
      .addCase(filterTeacherSyllabusesAsync.rejected, (state, action) => {
        state.loading = "fail";
        state.error = action.payload;
      });
  },
});

export default syllabusesSlice.reducer;
