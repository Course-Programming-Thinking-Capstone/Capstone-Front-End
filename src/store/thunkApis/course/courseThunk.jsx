import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCourseById } from "../../../helper/apis/course/course";

//get course by id
export const getCourseByIdAsync = createAsyncThunk(
  "course/getById",
  async (courseId, action, thunkAPI) => {
    try {
      const response = await getCourseById({ id: courseId, action: action });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
