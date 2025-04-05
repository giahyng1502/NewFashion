import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../service/axios"

// Tạo async thunk để fetch orders từ API
export const fetchOrders = createAsyncThunk(
    'order/fetchOrders',
    async (status, thunkAPI) => {
        try {
            const response = await axios.get('/order/getOrderUser',{params: {status: status}});
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const createOrder = createAsyncThunk(
    'order/createOrder',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post('/order/create',{name:data.name,phoneNumber:data.phoneNumber,address:data.address});
            return response.order;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const cancelOrder = createAsyncThunk(
    'order/cancelOrder',
    async (_id, thunkAPI) => {
        try {
            const response = await axios.put(`/order/cancel/${_id}`);            
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const writeReview = createAsyncThunk(
    "review/writeReview",
    async ({ orderId, rate, content, productId, images }, thunkAPI) => {
        try {
            

            const response = await axios.put(
                `/putreview/${orderId}`,{rate,content, productId, images} 
            );
            return response.review; // Đảm bảo API trả về dữ liệu đúng
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Có lỗi xảy ra");
        }
    }
);