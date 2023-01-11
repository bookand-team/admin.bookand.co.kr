import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

// axios 기본 설정
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_AXIOS_PROTOCOL}${process.env.NEXT_PUBLIC_AXIOS_HOST}${process.env.NEXT_PUBLIC_AXIOS_COMMON_PATH}`;
axios.defaults.withCredentials = true;  // front <-> backend 쿠키공유

// 여러 제보 조회하기
export const readReports = createAsyncThunk('readReports', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/reports', data);
    return response.data;
  } catch (error) {
    return rejectWithValue((error as AxiosError).response?.data);
  }
});