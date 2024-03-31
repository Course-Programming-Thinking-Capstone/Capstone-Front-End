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

    /*
    ** Add quiz information to section. action is: {sectionId, quiz {

          "id"?: 0,
          "title": "string",
          "description"?: "string",
          "duration": 0,
          "isOrderRandom"?: true,
          "numberOfQuestion"?: 0,
          "numberOfAttempt"?: 0,
    }}
    */
    addQuiz: (state, action) => {
      const { sectionId, quiz } = action.payload;

      const sectionIndex = state.data.sections.findIndex(
        (section) => section.id === sectionId
      );

      if (sectionIndex !== -1) {
        if (!state.data.sections[sectionIndex].quizzes) {
          state.data.sections[sectionIndex].quizzes = [];
        }

        state.data.sections[sectionIndex].quizzes.push(quiz);
      } else {
        state.error = { message: `Section id ${sectionId} not found.` };
      }
    },

    /*
    ** Update quiz common information in section. action is: {sectionId, index, quiz {

          "id"?: 0,
          "title": "string",
          "description"?: "string",
          "duration": 0,
          "isOrderRandom"?: true,
          "numberOfQuestion"?: 0,
          "numberOfAttempt"?: 0,
    }}
    */
    updateQuiz: (state, action) => {
      const { sectionId, index, quiz } = action.payload;

      const sectionIndex = state.data.sections.findIndex(
        (section) => section.id === sectionId
      );

      if (sectionIndex !== -1) {
        if (
          state.data.sections[sectionIndex].quizzes &&
          state.data.sections[sectionIndex].quizzes[index] !== undefined
        ) {
          state.data.sections[sectionIndex].quizzes[index].title = quiz.title;
          state.data.sections[sectionIndex].quizzes[index].description =
            quiz.description;
          state.data.sections[sectionIndex].quizzes[index].duration =
            quiz.duration;
          state.data.sections[sectionIndex].quizzes[index].isOrderRandom =
            quiz.isOrderRandom;
          state.data.sections[sectionIndex].quizzes[index].numberOfQuestion =
            quiz.numberOfQuestion;
          state.data.sections[sectionIndex].quizzes[index].numberOfAttempt =
            quiz.numberOfAttempt;
        } else {
          state.error = { message: `Quiz index ${index} not found.` };
        }
      } else {
        state.error = { message: `Section id ${sectionId} not found.` };
      }
    },

    /*
     ** Remove quiz. action is {sectionId, index}
     */
    removeQuiz: (state, action) => {
      const { sectionId, index } = action.payload;

      const sectionIndex = state.data.sections.findIndex(
        (section) => section.id === sectionId
      );

      if (sectionIndex !== -1) {
        if (
          state.data.sections[sectionIndex].quizzes &&
          state.data.sections[sectionIndex].quizzes !== null
        ) {
          if (
            index >= 0 &&
            index < state.data.sections[sectionIndex].quizzes.length
          ) {
            state.data.sections[sectionIndex].quizzes.splice(index, 1);
          } else {
            state.error = {
              message: `Quiz index ${index} is out of bounds.`,
            };
          }
        } else {
          state.error = {
            message: `Quizzes array in section id ${sectionId} is null or undefined.`,
          };
        }
      } else {
        state.error = { message: `Section id ${sectionId} not found.` };
      }
    },

    /*
    ** Add quiz question. action is {
      sectionId, quizIndex, question: {
              title: "string",
              score?: 1 - 100,
              options: [
                {
                  content: "string",
                  answerExplain?: "string",
                  isCorrect: true/false
                },
                {
                  content: "string",
                  answerExplain?: "string",
                  isCorrect: true/false
                },
                {
                  content: "string",
                  answerExplain?: "string",
                  isCorrect: true/false
                }
              ]
      }
    }

    */
    addQuestion: (state, action) => {
      const { sectionId, quizIndex, question } = action.payload;

      const sectionIndex = state.data.sections.findIndex(
        (section) => section.id === sectionId
      );

      if (sectionIndex !== -1) {
        //check quiz exist
        if (
          state.data.sections[sectionIndex].quizzes &&
          state.data.sections[sectionIndex].quizzes[quizIndex] !== undefined
        ) {
          state.data.sections[sectionIndex].quizzes[quizIndex].push(question);
        } else {
          state.error = { message: `Quiz index ${quizIndex} not found.` };
        }
      } else {
        state.error = { message: `Section id ${sectionId} not found.` };
      }
    },

    /*
    ** Update question information. action is {sectionId, quizIndex, questionIndex, question: {
      id?: 1,
      title: "string",
              score?: 1 - 100,
              options: [
                {
                  id?: 0,
                  content: "string",
                  answerExplain?: "string",
                  isCorrect: true/false
                },
                {
                  id?: 0
                  content: "string",
                  answerExplain?: "string",
                  isCorrect: true/false
                },
                {
                  id?: 0
                  content: "string",
                  answerExplain?: "string",
                  isCorrect: true/false
                }
              ]
    }}
    */
    updateQuestion: (state, action) => {
      const { sectionId, quizIndex, questionIndex, question } = action.payload;

      const sectionIndex = state.data.sections.findIndex(
        (section) => section.id === sectionId
      );

      if (sectionIndex !== -1) {
        if (
          state.data.sections[sectionIndex].quizzes &&
          state.data.sections[sectionIndex].quizzes[quizIndex] !== undefined
        ) {
          if (
            state.data.sections[sectionIndex].quizzes[quizIndex].questions &&
            state.data.sections[sectionIndex].quizzes[quizIndex].questions[
              questionIndex
            ] !== undefined
          ) {
            state.data.sections[sectionIndex].quizzes[quizIndex].questions[
              questionIndex
            ] = question;
          } else {
            state.error = {
              message: `Question index ${questionIndex} not found.`,
            };
          }
        } else {
          state.error = { message: `Quiz index ${quizIndex} not found.` };
        }
      } else {
        state.error = { message: `Section id ${sectionId} not found.` };
      }
    },

    /*
     ** Remove question. action is {sectionId, quizIndex, questionIndex}
     */
    removeQuestion: (state, action) => {
      const { sectionId, quizIndex, questionIndex } = action.payload;

      const sectionIndex = state.data.sections.findIndex(
        (section) => section.id === sectionId
      );

      if (sectionIndex !== -1) {
        if (
          state.data.sections[sectionIndex].quizzes &&
          state.data.sections[sectionIndex].quizzes !== null
        ) {
          if (
            state.data.sections[sectionIndex].quizzes[quizIndex].questions &&
            state.data.sections[sectionIndex].quizzes[quizIndex].questions !==
              null
          ) {
            if (
              questionIndex >= 0 &&
              questionIndex <
                state.data.sections[sectionIndex].quizzes[quizIndex].questions
                  .length
            ) {
              state.data.sections[sectionIndex].quizzes[
                quizIndex
              ].questions.splice(questionIndex, 1);
            } else {
              state.error = {
                message: `Question index ${questionIndex} is out of bounds.`,
              };
            }
          } else {
            state.error = {
              message: `Questions array in quiz index ${quizIndex} is null or undefined.`,
            };
          }
        } else {
          state.error = {
            message: `Quizzes array in section id ${sectionId} is null or undefined.`,
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
