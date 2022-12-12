import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// axios 기본 설정
axios.defaults.baseURL = process.env.BACKEND_BASE_URL;
axios.defaults.withCredentials = true;  // front <-> backend 쿠키공유

// 여러 서점 조회하기
export const readBookstores = createAsyncThunk('readBookstores', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/bookstores', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 여러 서점 삭제하기
export const deleteBookstores = createAsyncThunk('deleteBookstores', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.delete('/bookstores', { data });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});