import { createSlice } from "@reduxjs/toolkit";
import { getAccountClassAsync } from "../../thunkApis/class/classThunk";


const initData = [];

export const classSlice = createSlice({
    name: "classes",
    initialState: {
        data: initData,
        loading: "idle",
        error: null,
    },
    reducers: {
        resetData: (state) => {
            state.data = initData;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAccountClassAsync.pending, (state) => {
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getAccountClassAsync.fulfilled, (state, action) => {
                state.loading = "success";
                state.error = null;
                state.data = action.payload;
            })
            .addCase(getAccountClassAsync.rejected, (state, action) => {
                state.loading = "fail";
                state.error = action.payload;
            });
    },
})

export const { resetData, setData } = classSlice.actions;

export default classSlice.reducer;