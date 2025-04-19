import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../service/axios"

// Tạo async thunk để fetch categories từ API
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (page, thunkAPI) => {
        try {
            const response = await axios.get(`/`, {params: {page: page}});
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchSaleProducts = createAsyncThunk(
    'products/fetchSaleProducts',
    async (page, thunkAPI) => {
        try {
            const response = await axios.get(`/saleProduct/all`, {params: {page: page}});
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const fetchProductById = createAsyncThunk(
    'product/fetchOne',
    async (productId, { rejectWithValue }) => {
      try {
        const response = await axios.get(`/getone/${productId}`);
        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  export const searchProduct = createAsyncThunk(
    'product/searchProducts',
    async (query, { rejectWithValue }) => {
      try {
        const response = await axios.get(`/search`, {params: {search: query}});
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
