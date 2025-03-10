import { configureStore } from '@reduxjs/toolkit'
import userSlice from "../reducer/userReducer";
import categoryReducer from '../reducer/categoryReducer'
import subCategoryReducer from '../reducer/subCategoryReducer'
import productReducer from '../reducer/productReducer'
import orderReducer from '../reducer/orderReducer'


export default configureStore({
    reducer: {
        user : userSlice,
        category: categoryReducer,
        subCategory: subCategoryReducer,
        product: productReducer,
        order:orderReducer
    }
})