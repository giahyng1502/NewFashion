import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { fetchOrders,createOrder } from '../actions/orderActions';

const initialState = {
  orders: [],
};

// Tạo slice cho orders
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        // console.log('Fetch orders successfully: ', action.payload);
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        console.log('Fetch categories failed: ', action.payload);
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        console.log('Add to cart failed: ', action.payload);
      })
  },
});

export default orderSlice.reducer;
