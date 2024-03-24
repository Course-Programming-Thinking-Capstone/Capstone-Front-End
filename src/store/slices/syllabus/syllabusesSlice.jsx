import { createSlice } from "@reduxjs/toolkit";
import { filterSyllabusesAsync } from "../../thunkApis/syllabuses/syllabusesThunk";
import { getCourseByIdAsync } from "../../thunkApis/course/courseThunk";

export const syllabusesSlice = createSlice({
  name: "syllabuses",
  initialState: {
    data: [],
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
      .addCase(getCourseByIdAsync.rejected, (state, action) => {
        state.loading = "fail";
        state.error = action.payload;
      });
  },
});

export default syllabusesSlice.reducer;
