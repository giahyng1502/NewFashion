import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../service/axios"

// Tạo async thunk để fetch categories từ API
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/cart/getCart');            
            return response.data;
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
            thunkAPI.dispatch(fetchCart())
            return response.cart;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateCart = createAsyncThunk(
    'cart/updateCart',
    async (data, thunkAPI) => {
        try {
            const response = await axios.put('/cart/updatecart/', data);            
            return response.cart;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteCart = createAsyncThunk(
    'cart/deleteCart',
    async (_, thunkAPI) => {
        try {
            const response = await axios.delete('/cart/removeFromCart/');            
            return response.cart;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);