import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addInformation, deleteInformation, fetchInformation, updateDefaultInformation, updateInformation } from '../actions/infomationActions';


const initialState = {
    personalInfo: null,
};

// Tạo slice cho categories
const personalInfoSlice = createSlice({
    name: 'personalInfo',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchInformation.fulfilled, (state, action) => {
                state.personalInfo = action.payload;
            })
            .addCase(fetchInformation.rejected, (state, action) => {
                console.log('Fetch personal info failed: ', action.payload);
            })

            .addCase(addInformation.fulfilled, (state, action) => {
                state.personalInfo.information.push(action.payload);
            })
            .addCase(addInformation.rejected, (state, action) => {
                console.log('Add personal info failed: ', action.payload);
            })

            .addCase(updateInformation.fulfilled, (state, action) => {
                const index = state.personalInfo.information.findIndex(info => info._id === action.payload._id);
                state.personalInfo.information[index] = action.payload;
            })
            .addCase(updateInformation.rejected, (state, action) => {
                console.log('Update personal info failed: ', action.payload);
            })

            .addCase(updateDefaultInformation.fulfilled, (state, action) => {
                const index = state.personalInfo.information.findIndex(info => info._id === action.payload._id);
                state.personalInfo.information.forEach((item)=>{
                    item.isDefault=false
                })
                state.personalInfo.information[index] = action.payload;
            })
            .addCase(updateDefaultInformation.rejected, (state, action) => {
                console.log('Update default address failed: ', action.payload);
            })

            .addCase(deleteInformation.fulfilled, (state, action) => {
                state.personalInfo.information = state.personalInfo.information.filter(info => info._id !== action.payload);
            })
            .addCase(deleteInformation.rejected, (state, action) => {
                console.log('Delete information failed: ', action.payload);
            })
    },
});

export default personalInfoSlice.reducer;