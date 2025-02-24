import { configureStore } from '@reduxjs/toolkit'
import userSlice from "../reducer/userReducer";
import categoryReducer from '../reducer/categoryReducer'
import subCategoryReducer from '../reducer/subCategoryReducer'

export default configureStore({
    reducer: {
        user : userSlice,
        category: categoryReducer,
        subCategory: subCategoryReducer
    }
})