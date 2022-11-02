import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { backendBaseUrl } from '../../../config/config';

// axios 기본 설정
axios.defaults.baseURL = backendBaseUrl;
axios.defaults.withCredentials = true;  // front <-> backend 쿠키공유

// 여러 제보 조회하기
export const readReports = createAsyncThunk('readReports', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/reports', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});