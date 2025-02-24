import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../service/axios";

export const fetchSubCategories = createAsyncThunk(
    'subCategories/fetchSubCategories',
    async (categoryId, thunkAPI) => {
        try {
            const response1 = await axios.get(`/subcategory/${categoryId}`);
            const response2 = await axios.get(`/category/getProduct/${categoryId}`);
            return { categoryId, subCategories: response1.data.subCategory, products: response2.data };    
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);