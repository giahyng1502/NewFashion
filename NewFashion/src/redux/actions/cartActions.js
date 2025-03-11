import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../service/axios"

// Tạo async thunk để fetch categories từ API
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/cart/getCart');            
            return response.data.products;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post('/cart/addToCart', data);            
            return response.cart.products;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);