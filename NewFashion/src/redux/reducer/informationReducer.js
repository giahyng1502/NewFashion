import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addInformation, fetchInformation } from '../actions/infomationActions';


const initialState = {
    personalInfo: {},
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
    },
});

export default personalInfoSlice.reducer;