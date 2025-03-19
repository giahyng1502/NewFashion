import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../service/axios"

// Tạo async thunk để fetch categories từ API
export const fetchInformation = createAsyncThunk(
    'cart/fetchInformation',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/users/getme');            
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const addInformation = createAsyncThunk(
    'cart/addInformation',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post('/information', data);            
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

// export const updateCart = createAsyncThunk(
//     'cart/updateCart',
//     async (data, thunkAPI) => {
//         try {
//             const response = await axios.put('/cart/updatecart/', data);            
//             return response.cart.products;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.response.data);
//         }
//     }
// );

// export const deleteCart = createAsyncThunk(
//     'cart/deleteCart',
//     async (_, thunkAPI) => {
//         try {
//             const response = await axios.delete('/cart/removeFromCart/');            
//             return response.cart.products;
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.response.data);
//         }
//     }
// );