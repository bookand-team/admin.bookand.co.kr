import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// axios 기본 설정
axios.defaults.baseURL = process.env.BACKEND_BASE_URL;
axios.defaults.withCredentials = true;  // front <-> backend 쿠키공유

// 이미지 url 생성하기
export const createImageUrl = createAsyncThunk('createImageUrl', async (form_data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/image', { form_data }, { headers: { 'Content-Type': 'multipart/form-data' } });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});