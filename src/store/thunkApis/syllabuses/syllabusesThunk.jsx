import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  filterSyllabus,
  filterTeacherSyllabus,
  getSyllabusById,
} from "../../../helper/apis/syllabus/syllabus";

// filter syllabus list
export const filterSyllabusesAsync = createAsyncThunk(
  "syllabuses",
  async (filter, thunkAPI) => {
    try {
      const response = await filterSyllabus(filter);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// filter teacher syllabus list
export const filterTeacherSyllabusesAsync = createAsyncThunk(
  "syllabuses/teacher",
  async (filter, thunkAPI) => {
    try {
      const response = await filterTeacherSyllabus(filter);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//get syllabus by id
export const getSyllabusByIdAsync = createAsyncThunk(
  "syllabuses/getById",
  async (id, thunkAPI) => {
    try {
      const response = await getSyllabusById({ id });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
