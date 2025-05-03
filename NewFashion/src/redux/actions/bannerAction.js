import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../service/axios";

export const fetchBanner = createAsyncThunk(
    'banner/fetchBanner',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/banner/getAll');
            return response.banner;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
