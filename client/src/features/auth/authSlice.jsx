import { createSlice } from '@reduxjs/toolkit';
import { login, logout, me, register } from './authApiSlice.jsx';

// <!-- Initial State -->
const initialState = {
  user: {},
  isLoading: false,
  successMessage: '',
  error: ''
};

// <!-- create auth slice -->
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMessageEmpty: (state) => {
      state.successMessage = '';
      state.error = '';
    }
  },
  extraReducers: (build) => {
    // <!-- Register Api -->
    build

      // <!-- User Register -->
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        localStorage.setItem('user', action.payload.user);
        state.user = action.payload.user;
        state.successMessage = action.payload.message;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })

      // <!-- User Login -->
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        localStorage.setItem('user', action.payload.user);
        state.user = action.payload.user;
        state.successMessage = action.payload.message;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })

      // <!-- Logged In User -->
      .addCase(me.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(me.fulfilled, (state, action) => {
        localStorage.setItem('user', action.payload.user);
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(me.rejected, (state, action) => {
        localStorage.removeItem('user');
        state.error = action.error.message;
        state.isLoading = false;
      })

      // <!-- Logout In User -->
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = {};
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  }
});

// <!-- export selectors -->
export const getAllAuthData = (state) => state.auth;

// <!-- export actions -->
export const { setMessageEmpty } = authSlice.actions;

// <!-- export reducer -->
export default authSlice.reducer;
