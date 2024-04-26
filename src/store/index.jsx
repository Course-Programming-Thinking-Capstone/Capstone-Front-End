import { configureStore } from "@reduxjs/toolkit";
import createCourseReducer from "./slices/course/createCourseSlice";
import syllabusesReducer from "./slices/syllabus/syllabusesSlice";
import syllabusDetailReducer from "./slices/syllabus/syllabusDetailSlice";
import menuReducer from "./slices/menu/menuSlice";
import componentNumberReducer from "./slices/course/componentNumber";
import notificationReducer from "./slices/notification/notificationSlice";

export default configureStore({
  reducer: {
    createCourse: createCourseReducer,
    syllabuses: syllabusesReducer,
    syllabusDetail: syllabusDetailReducer,
    menu: menuReducer,
    componentNumber: componentNumberReducer,
    notification: notificationReducer
  },
});
