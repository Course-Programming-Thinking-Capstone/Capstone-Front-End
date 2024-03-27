import { createSlice } from "@reduxjs/toolkit";
import { getCourseByIdAsync } from "../../thunkApis/course/courseThunk";

const entity = {
  id: 0,
  name: "",
  description: "",
  pictureUrl: "",
  startSaleDate: "",
  endSaleDate: "",
  price: 0,
  discountPrice: 0,
  totalLesson: 0,
  isFree: true,
  status: "Draft",
  createdDate: "",
  modifiedDate: "",
  createdById: 0,
  createdByName: "",
  modifiedById: 0,
  modifiedByName: "",
  approvedById: 0,
  approvedByName: "",
  sections: [],
};

export const createCourseSlice = createSlice({
  name: "createCourse",
  initialState: {
    data: entity,
    loading: "idle",
    error: {},
  },
  reducers: {
    resetData: (state) => {
      state.data = entity;
    },

    setData: (state, action) => {
      state.data = action.payload;
    },

    setDescription: (state, action) => {
      state.data.description = action.payload.description;
    },

    //action is video {sectionId, video: {}}
    addVideo: (state, action) => {
      const { sectionId, video } = action.payload;

      const sectionIndex = state.data.sections.findIndex(
        (section) => section.id === sectionId
      );

      if (sectionIndex !== -1) {
        if (!state.data.sections[sectionIndex].lessons) {
          state.data.sections[sectionIndex].lessons = [];
        }

        state.data.sections[sectionIndex].lessons.push(video);
      } else {
        state.error = { message: `Section id ${sectionId} not found.` };
      }
    },

    //action is video {sectionId, lessonIndex, video: {}}
    updateVideo: (state, action) => {
      const { sectionId, lessonIndex, video } = action.payload;

      const sectionIndex = state.data.sections.findIndex(
        (section) => section.id === sectionId
      );

      if (sectionIndex !== -1) {
        if (
          state.data.sections[sectionIndex].lessons &&
          state.data.sections[sectionIndex].lessons[lessonIndex] !== undefined
        ) {
          state.data.sections[sectionIndex].lessons[lessonIndex] = video;
        } else {
          state.error = { message: `Lesson index ${lessonIndex} not found.` };
        }
      } else {
        state.error = { message: `Section id ${sectionId} not found.` };
      }
    },

    //action is document {sectionId, document: {}}
    addDocument: (state, action) => {
      const { sectionId, document } = action.payload;

      const sectionIndex = state.data.sections.findIndex(
        (section) => section.id === sectionId
      );

      if (sectionIndex !== -1) {
        if (!state.data.sections[sectionIndex].lessons) {
          state.data.sections[sectionIndex].lessons = [];
        }

        state.data.sections[sectionIndex].lessons.push(document);
      } else {
        state.error = { message: `Section id ${sectionId} not found.` };
      }
    },

    //action is document {sectionId, lessonIndex, document: {}}
    updateDocument: (state, action) => {
      const { sectionId, lessonIndex, document } = action.payload;

      const sectionIndex = state.data.sections.findIndex(
        (section) => section.id === sectionId
      );

      if (sectionIndex !== -1) {
        if (
          state.data.sections[sectionIndex].lessons &&
          state.data.sections[sectionIndex].lessons[lessonIndex] !== undefined
        ) {
          state.data.sections[sectionIndex].lessons[lessonIndex] = document;
        } else {
          state.error = { message: `Lesson index ${lessonIndex} not found.` };
        }
      } else {
        state.error = { message: `Section id ${sectionId} not found.` };
      }
    },

    //action is  {sectionId, lessonIndex}
    removeLesson: (state, action) => {
      const { sectionId, lessonIndex } = action.payload;

      const sectionIndex = state.data.sections.findIndex(
        (section) => section.id === sectionId
      );

      if (sectionIndex !== -1) {
        if (
          state.data.sections[sectionIndex].lessons &&
          state.data.sections[sectionIndex].lessons !== null
        ) {
          if (
            lessonIndex >= 0 &&
            lessonIndex < state.data.sections[sectionIndex].lessons.length
          ) {
            state.data.sections[sectionIndex].lessons.splice(lessonIndex, 1);
          } else {
            state.error = {
              message: `Lesson index ${lessonIndex} is out of bounds.`,
            };
          }
        } else {
          state.error = {
            message: `Lessons array in section id ${sectionId} is null or undefined.`,
          };
        }
      } else {
        state.error = { message: `Section id ${sectionId} not found.` };
      }
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourseByIdAsync.pending, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(getCourseByIdAsync.fulfilled, (state, action) => {
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

export const {
  resetData,
  setData,
  setDescription,
  addDocument,
  addVideo,
  removeLesson,
  setError,
  updateDocument,
  updateVideo,
} = createCourseSlice.actions;

export default createCourseSlice.reducer;
