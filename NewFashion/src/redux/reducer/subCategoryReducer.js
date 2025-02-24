import { createSlice } from "@reduxjs/toolkit";
import { fetchSubCategories } from "../actions/subCateActions";

const subCategorySlice = createSlice({
    name: 'subCategories',
    initialState: {
        subCategoriesByCategory: {}, // { categoryId: { subCategories, products } }
    },
    reducers: { },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubCategories.fulfilled, (state, action) => {
                const { categoryId, subCategories, products } = action.payload;
                state.subCategoriesByCategory[categoryId] = { subCategories, products };
                console.log('Fetch subCategories successfully: ', action.payload);
            })
            .addCase(fetchSubCategories.rejected, (state, action) => {
                console.log('Fetch subCategories failed: ', action.payload);
            });
    }
});

export default subCategorySlice.reducer;

