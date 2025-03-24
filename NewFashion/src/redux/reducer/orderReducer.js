import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { fetchOrders } from '../actions/orderActions';

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
        // console.log('Fetch categories failed: ', action.payload);
      });
  },
});

export default orderSlice.reducer;
