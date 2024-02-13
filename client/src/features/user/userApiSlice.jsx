import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// <!-- get all user -->
export const getAllUser = createAsyncThunk('user/getAllUser', async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/user`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`
      }
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// <!-- send Message  -->
export const sendMessage = createAsyncThunk('user/sendMessage', async (formData) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/message/send-message`, formData, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`
      }
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// <!-- Get Single User Message  -->
export const getSingleMessage = createAsyncThunk('user/getSingleMessage', async (id) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URI}/api/v1/message/get-message/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`
      }
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// <!-- Message Status Change  -->
export const messageStatusChange = createAsyncThunk('user/messageStatusChange', async ({ id, data }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URI}/api/v1/message/seen-message/${id}`, data, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`
      }
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
