import { configureStore } from '@reduxjs/toolkit'
import userSlice from "../reducer/userReducer";
import categoryReducer from '../reducer/categoryReducer'
import subCategoryReducer from '../reducer/subCategoryReducer'
import productReducer from '../reducer/productReducer'
import cartReducer from '../reducer/cartReducer'
import personalInfoReducer from '../reducer/informationReducer'
import voucherReducer from '../reducer/voucherReducer'


export default configureStore({
    reducer: {
        user : userSlice,
        category: categoryReducer,
        subCategory: subCategoryReducer,
        product: productReducer,
        cart: cartReducer,
        personalInfo: personalInfoReducer,
        coupons: voucherReducer
    }
})