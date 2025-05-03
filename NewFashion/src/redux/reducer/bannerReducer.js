import {createSlice} from "@reduxjs/toolkit";
import {fetchBanner} from "../actions/bannerAction";

const bannerSlice = createSlice({
    name: "banner",
    initialState : {
        banner : []
    },
    extraReducers : builder => {
        builder.addCase(fetchBanner.fulfilled, (state, action) => {
            const imageUrls = action.payload.map(data => data.imageUrl);
            state.banner = imageUrls;
        })
    }
})

export default bannerSlice.reducer;
