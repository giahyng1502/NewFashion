import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../service/axios";

export const getNotifications = createAsyncThunk('get/notification',async (_,thunkAPI) => {
    try {
        const res = await axios.get(`/notification/getAll`);
        return res.data;
    }catch(error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})