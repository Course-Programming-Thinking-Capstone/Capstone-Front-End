import { createAsyncThunk } from "@reduxjs/toolkit";
import { getNumberOfUnreadNotification } from "../../../helper/apis/notification/notification";


export const getNumberOfUnReadNotificationAsync = createAsyncThunk(
    "notification/numberOfUnread",
    async (thunkAPI) => {
        try {
            const data = await getNumberOfUnreadNotification();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)