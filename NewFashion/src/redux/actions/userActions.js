import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../service/axios"

export const checkEmail = createAsyncThunk(
    'users/checkEmail',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/users/checkEmail');            
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

//login
export const login = createAsyncThunk(
    'users/login',
    async (user, thunkAPI) => {
        try {
            const response = await axios.post('/users/login', user);            
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

