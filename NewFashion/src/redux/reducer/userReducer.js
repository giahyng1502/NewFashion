import {createSlice} from '@reduxjs/toolkit';
import {
  loginWithEmail,
  loginWithGoogle,
  updateUser,
} from '../actions/userActions';

const initialState = {
  userId: '',
  name: '',
  email: '',
  avatar: '',
  role: 0,
  onlineUser: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.role = action.payload.role;
    },
    logout: (state, action) => {
      state.userId = '';
      state.name = '';
      state.email = '';
      state.avatar = '';
      state.role = 0;
    },
    setOnlineUser: (state, action) => {
      state.onlineUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        const user = action.payload.user;
        state.userId = user._id;
        state.name = user.name;
        state.email = user.email;
        state.avatar = user.avatar;
        state.role = user.role;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        const user = action.payload.user;
        state.userId = user._id;
        state.name = user.name;
        state.email = user.email;
        state.avatar = user.avatar;
        state.role = user.role;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.avatar = action.payload.avatar;
      });
  },
});

export const {setUser, setToken, logout, setOnlineUser} = userSlice.actions;

export default userSlice.reducer;
