import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../service/axios"

// Tạo async thunk để fetch categories từ API
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (page, thunkAPI) => {
        try {
            const response = await axios.get(`/`, {params: {page: page}});            
            return response.data;
        } catch (error) {            
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

