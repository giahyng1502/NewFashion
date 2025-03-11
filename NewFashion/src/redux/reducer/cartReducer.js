import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addToCart, fetchCart } from '../actions/cartActions';


const initialState = {
    carts: [],
};

// Tạo slice cho categories
const cartSlice = createSlice({
    name: 'carts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.carts = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                console.log('Fetch carts failed: ', action.payload);
            })

            // Add to cart
            .addCase(addToCart.fulfilled, (state, action) => {
                state.carts = action.payload;
            })
            .addCase(addToCart.rejected, (state, action) => {
                console.log('Add to cart failed: ', action.payload);
            })
    },
});

export default cartSlice.reducer;