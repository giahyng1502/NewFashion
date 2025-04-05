import {createSlice} from "@reduxjs/toolkit";
import {getNotifications} from "../actions/notificationActions";
const initialState = {
    notifications: [],
    isLoading: false,
}
const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.notifications = [action.payload,...state.notifications];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getNotifications.pending, (state, action) => {
            state.isLoading = true;
        })
            .addCase(getNotifications.fulfilled, (state, action) => {
                state.isLoading = false;
                state.notifications = action.payload;
            })
            .addCase(getNotifications.rejected, (state, action) => {
                state.isLoading = false;
            })
    }
})

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;