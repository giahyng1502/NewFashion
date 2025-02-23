import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userId : "",
    name : "",
    email : "",
    avatar : "",
    onlineUser : [],
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser : (state,action)=>{
            state.userId = action.payload.userId
            state.name = action.payload.name
            state.email = action.payload.email
            state.avatar = action.payload.avatar
        },
        logout : (state,action)=>{
            state.userId = ""
            state.name = ""
            state.email = ""
            state.avatar = ""
        },
        setOnlineUser : (state,action)=>{
            state.onlineUser = action.payload
        },
    },
})

export const { setUser, setToken ,logout, setOnlineUser } = userSlice.actions

export default userSlice.reducer