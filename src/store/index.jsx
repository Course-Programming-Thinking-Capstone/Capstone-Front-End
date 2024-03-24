import { configureStore } from "@reduxjs/toolkit";
import createCourseReducer from "./slices/course/createCourseSlice";

export default configureStore({
  reducer: {
    createCourse: createCourseReducer,
  },
});
