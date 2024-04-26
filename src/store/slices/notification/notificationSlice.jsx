import { createSlice } from "@reduxjs/toolkit";
import { getNumberOfUnReadNotificationAsync } from "../../thunkApis/notification/notificationsThunk";


const initData = {
    numberOfUnread: 0
}

export const notificationSlice = createSlice({
    name: "notification",
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
            .addCase(getNumberOfUnReadNotificationAsync.pending, (state) => {
                state.loading = "loading";
                state.error = null;
            })
            .addCase(getNumberOfUnReadNotificationAsync.fulfilled, (state, action) => {
                state.loading = "success";
                state.error = null;
                state.data.numberOfUnread = action.payload;
            })
            .addCase(getNumberOfUnReadNotificationAsync.rejected, (state, action) => {
                state.loading = "fail";
                state.error = action.payload;
            });
    },
})

export const {resetData, setData } = notificationSlice.actions;

export default notificationSlice.reducer;


