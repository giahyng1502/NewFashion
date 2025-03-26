import { createSlice } from '@reduxjs/toolkit';
import { fetchCoupon } from '../actions/voucherAction';

const initialState = {
    coupons: [],
};

const couponSlice = createSlice({
    name: 'coupons',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCoupon.fulfilled, (state, action) => {
                state.coupons = action.payload;
            })
            .addCase(fetchCoupon.rejected, (state, action) => {
                console.log('Fetch coupon failed: ', action.payload);
            })
    }
})

export default couponSlice.reducer;