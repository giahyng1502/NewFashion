import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../service/axios"

// Tạo async thunk để fetch orders từ API
export const fetchOrders = createAsyncThunk(
    'order/fetchOrders',
    async (status, thunkAPI) => {
        try {
            const response = await axios.get('/order/getOrderUser?status=',{params: {status: status}});            
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
            return response.data;
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
    async ({ orderId, rate, content, productId, files }, thunkAPI) => {
        try {
            // Tạo FormData nếu có file
            const formData = new FormData();
            formData.append("rate", rate);
            formData.append("content", content);
            formData.append("productId", productId);

            // Nếu có files, append từng file vào formData
            if (files && files.length > 0) {
                files.forEach((file, index) => {
                    formData.append(`files`, file); // Backend nhận dạng mảng files
                });
            }

            const response = await axios.put(
                `/putreview/${orderId}`, 
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            );
            return response.review; // Đảm bảo API trả về dữ liệu đúng
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Có lỗi xảy ra");
        }
    }
);