import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../service/axios";

export const fetchSubCategories = createAsyncThunk(
    'subCategories/fetchSubCategories',
    async (categoryId, thunkAPI) => {
        try {
            const response = await axios.get(`/subcategory/${categoryId}`);
            return { categoryId, subCategories: response.data.subCategory };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);