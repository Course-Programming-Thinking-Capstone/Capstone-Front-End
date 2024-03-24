import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCourseById } from "../../../helper/apis/course/course";

//get course by id
export const getCourseById = createAsyncThunk(
  "course/getById",
  async (courseId, action, thunkAPI) => {
    try {
      const response = await getCourseById({ courseId, action });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
