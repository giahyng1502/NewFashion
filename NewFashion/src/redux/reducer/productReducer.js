import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts, fetchSaleProducts } from "../actions/productActions";
import { writeReview } from "../actions/orderActions";

const initialState = {
    products: [],
    saleProducts: [],
    page: 1,
    loading: false,
    hasMore: true,
    hasMoreSale: true,
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
                console.log('Fetch products success: ', action.payload.length);
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                console.log('Fetch products failed: ', action.payload);
                state.loading = false;
            })

            .addCase(fetchSaleProducts.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchSaleProducts.fulfilled, (state, action) => {
                state.saleProducts = [...state.saleProducts, ...action.payload];
                state.page += 1;
                state.hasMoreSale = action.payload.length > 0
                state.loading = false;
            })
            .addCase(fetchSaleProducts.rejected, (state, action) => {
                console.log('Fetch sale products failed: ', action.payload);
                state.loading = false;
            })

            .addCase(writeReview.fulfilled, (state, action) => {
                const product = state.products.find(item => item._id === action.payload.productId);
                if (product) {
                    product.reviews = [...product.reviews, action.payload]; // Đảm bảo state không bị mutate
                }
            })
            .addCase(writeReview.rejected, (state, action) => {
                console.log('Review product failed: ', action.payload);
            });
    }
});

export default productSlice.reducer;
