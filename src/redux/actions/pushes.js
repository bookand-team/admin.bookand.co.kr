import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// axios 기본 설정
axios.defaults.baseURL = process.env.BACKEND_BASE_URL;
axios.defaults.withCredentials = true;  // front <-> backend 쿠키공유

// 여러 푸시 조회하기
export const readPushes = createAsyncThunk('readPushes', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/pushes', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 여러 푸시 삭제하기
export const deletePushes = createAsyncThunk('deletePushes', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.delete('/pushes', { data });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});