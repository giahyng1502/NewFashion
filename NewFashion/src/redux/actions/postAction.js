import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../service/axios";

export const getPosts = createAsyncThunk('post/getAll',async (_, thunkAPI) => {
    try {
        const response = await axios.get('/post/getAll');
        return response.data;
    }catch(err) {
        console.log(err)
        return thunkAPI.rejectWithValue(err.response.data);
    }
})

export const toggleLikePost = createAsyncThunk('post/toggleLikePost',async (postId, thunkAPI) => {
    try {
        const response = await axios.put(`/post/toggleLikePost/${postId}`);
        return {_id : postId , data : response.data} ;
    }catch(err) {
        console.log(err)
        return thunkAPI.rejectWithValue(err.response.data);
    }
})