import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../service/axios';

export const checkEmail = createAsyncThunk(
  'users/checkEmail',
  async (email, thunkAPI) => {
    try {
      const response = await axios.post('/users/checkEmail', email);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  },
);

//login
export const loginWithEmail = createAsyncThunk(
    'users/login',
    async (user, thunkAPI) => {
        try {
            return await axios.post('/users/login', user);
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
            const response = await axios.post('/users/register', user);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const loginWithGoogle = createAsyncThunk('users/loginWithGoogle',async (user,thunkApi) => {
    try {
        return await axios.post('/users/loginWithGoogle', {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            picture: user.photoURL,
        });
    }catch(error) {
        console.log(error);
        return thunkApi.rejectWithValue(error.response.data);
        }
    }
);


