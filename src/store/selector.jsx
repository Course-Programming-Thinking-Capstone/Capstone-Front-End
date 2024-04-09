//createSlice selector
export const createCourseSelector = (state) => state.createCourse.data;

//syllabuses selector
export const syllabusesSelector = (state) => state.syllabuses.data;

//syllabusDetail
export const syllabusDetailSelector = (state) => state.syllabusDetail.data;

//createCourseId
export const createCourseIdSelector = (state) =>
  state.syllabusDetail.data.courseId;

//teacherActiveMenu selector
export const teacherActiveMenuSelector = (state) =>
  state.menu.data.teacherActiveMenu;

//component number
export const componentNumberSelector = (state) => state.componentNumber.data;
