import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// axios 기본 설정
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
axios.defaults.withCredentials = true;  // front <-> backend 쿠키공유

// 여러 멤버 조회하기
export const readMembers = createAsyncThunk('readMembers', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/members', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});