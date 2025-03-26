import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../service/axios"

// Tạo async thunk để fetch coupon từ API
export const fetchCoupon = createAsyncThunk(
    'coupons/fetchCoupon',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/voucher/getall');            
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);