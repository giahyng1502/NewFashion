import {createSlice} from "@reduxjs/toolkit";
import {getPosts, toggleLikePost} from "../actions/postAction";

const postReducer = createSlice({
    name: "post",
    initialState : {
        isLoading: false,
        error: null,
        posts: [],
    },
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state, action) => {
            state.isLoading = true;
        })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
        })
            .addCase(toggleLikePost.fulfilled, (state, action) => {
                const {likes,isLike} = action.payload.data;
                state.posts = state.posts.map(post => post._id === action.payload._id ? {...post,likes : likes ,isLike : isLike } : post);
            })
    }
})

export default postReducer.reducer