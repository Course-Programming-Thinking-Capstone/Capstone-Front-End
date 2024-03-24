import { createSlice } from "@reduxjs/toolkit";
import { getCourseById } from "../../thunkApis/course/courseThunk";

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
    entity: entity,
    loading: "idle",
    error: {},
  },
  reducers: {
    resetData: (state) => {
      state.entity = entity;
    },

    setData: (state, action) => {
      state.entity = action.payload;
    },

    setDescription: (state, action) => {
      state.entity.description = action.payload.description;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourseById.loading, (state) => {
        state.loading = "loading";
        state.error = null;
      })
      .addCase(getCourseById.fulfilled, (state, action) => {
        state.loading = "success";
        (state.error = null), (state.entity = action.payload);
      })
      .addCase(getCourseById.rejected, (state, action) => {
        state.loading = "fail";
        state.error = action.payload;
      });
  },
});

export const { resetData, setData, setDescription } = createCourseSlice.actions;

export default createCourseSlice.reducer;
