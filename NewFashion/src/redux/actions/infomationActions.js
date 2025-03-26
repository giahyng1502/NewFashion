import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../service/axios"

// Tạo async thunk để fetch categories từ API
export const fetchInformation = createAsyncThunk(
    'info/fetchInformation',
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
    'info/addInformation',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post('/information', data);            
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateInformation = createAsyncThunk(
    'info/updateInformation',
    async ({ id, data }, thunkAPI) => {
        try {
            const response = await axios.put(`/information/${id}`, data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateDefaultInformation = createAsyncThunk(
    'info/updateDefaultInformation',
    async (inforId, thunkAPI) => {
        try {
            const response = await axios.put(`/information/default/${inforId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteInformation = createAsyncThunk(
    'info/deleteInformation',
    async (inforId, thunkAPI) => {
        try {
            const response = await axios.delete(`/information/${inforId}`);
            return inforId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);