import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createOrder, fetchOrders, cancelOrder } from '../actions/orderActions';

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
        state.orders = [action.payload,...state.orders];
      })
      .addCase(createOrder.rejected, (state, action) => {
        console.log('Fetch categories failed: ', action.payload);
      })

      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(order => order._id !== action.meta.arg);
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.error = action.payload;
        console.log('Cancel order failed: ', action.payload);
      })
  },
});

export default orderSlice.reducer;
