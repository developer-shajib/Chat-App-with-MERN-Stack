import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// <!-- register user -->
export const register = createAsyncThunk('auth/register', async (data) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/auth/register`, data, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// <!-- login user -->
export const login = createAsyncThunk('auth/login', async (data) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/auth/login`, data, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
// <!-- logout user -->
export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/auth/logout`, {}, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// <!-- me user -->
export const me = createAsyncThunk('auth/me', async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/auth/me`, { withCredentials: true });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
