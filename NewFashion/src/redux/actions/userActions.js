import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../service/axios"

export const checkEmail = createAsyncThunk(
    'users/checkEmail',
    async (email, thunkAPI) => {
        try {
            const response = await axios.post('/users/checkEmail', email);            
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
);

//login
export const loginWithEmail = createAsyncThunk(
    'users/login',
    async (user, thunkAPI) => {
        try {
            const response = await axios.post('/users/login', user);                        
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
//register
export const register = createAsyncThunk(
    'users/register',
    async (user, thunkAPI) => {
        try {
            const response = await axios.post('/users/register', user)
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

