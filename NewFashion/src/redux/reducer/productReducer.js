import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "../actions/productActions";

const initialState = {
    products: [],
    page: 1,
    loading: false,
    hasMore: true
};

// Tạo slice cho categories
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = [...state.products, ...action.payload];
                state.page += 1;
                state.hasMore = action.payload.length > 0
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                console.log('Fetch products failed: ', action.payload);
                state.loading = false;
            });
    }
});

export default productSlice.reducer;
