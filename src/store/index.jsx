import { configureStore } from "@reduxjs/toolkit";
import createCourseReducer from "./slices/course/createCourseSlice";
import syllabusesReducer from "./slices/syllabus/syllabusesSlice";

export default configureStore({
  reducer: {
    createCourse: createCourseReducer,
    syllabuses: syllabusesReducer,
  },
});
