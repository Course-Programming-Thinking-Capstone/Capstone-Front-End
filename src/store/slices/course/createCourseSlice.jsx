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
  setions: [],
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

export const { resetData, setData, setDescription } = createCourseSlice.actions;

export default createCourseSlice.reducer;
