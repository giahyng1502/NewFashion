import { createSlice } from "@reduxjs/toolkit";
import { fetchProductBySubCategory, fetchSubCategories } from "../actions/subCateActions";

const subCategorySlice = createSlice({
    name: 'subCategories',
    initialState: {
        subCategoriesByCategory: {}, // { categoryId: { subCategories, products } }
        productsBySubCategory: {}, // { subCategoryId: products }
    },
    reducers: { },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubCategories.fulfilled, (state, action) => {
                const { categoryId, subCategories, products } = action.payload;
                state.subCategoriesByCategory[categoryId] = { subCategories, products };
            })
            .addCase(fetchSubCategories.rejected, (state, action) => {
                console.log('Fetch subCategories failed: ', action.payload);
            })


            // export const fetchProductBySubCategory = createAsyncThunk(
            //     'subCategories/fetchProductBySubCategory',
            //     async (subCategoryId, thunkAPI) => {
            //         try {
            //             const response = await axios.get(`/subcategory/searchProduct/${subCategoryId}`);
            //             return { subCategoryId, products: response.data };
            //         } catch (error) {
            //             return thunkAPI.rejectWithValue(error.response.data);
            //         }
            //     }
            // );
            .addCase(fetchProductBySubCategory.fulfilled, (state, action) => {
                const { subCategoryId, products } = action.payload;
                state.productsBySubCategory[subCategoryId] = products;
                console.log('Fetch products by subCategory successfully: ', action.payload);
            })
            .addCase(fetchProductBySubCategory.rejected, (state, action) => {
                console.log('Fetch products by subCategory failed: ', action.payload);
            })
    }
});

export default subCategorySlice.reducer;

