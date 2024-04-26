import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAccountCLass } from "../../../helper/apis/class/class";


export const getAccountClassAsync = createAsyncThunk(
    "classes",
    async (thunkAPI) => {
        try {
            const data = await getAccountCLass();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)