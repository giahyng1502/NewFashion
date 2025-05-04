import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../service/axios"
import { fetchCart } from "./cartActions";

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
    async ({ name, phoneNumber, address, momo,point ,voucherId }, thunkAPI) => {
        try {
            const response = await axios.post('/order/create', {
                name,
                phoneNumber,
                address,
                momo,
                point,
                voucherId
            });
            console.log('name',name);
            thunkAPI.dispatch(fetchCart())
            return response.order; // hoặc response.data.order tùy API
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || 'Đã có lỗi xảy ra');
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