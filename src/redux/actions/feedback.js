import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { backendBaseUrl } from '../../../config/config';

// axios 기본 설정
axios.defaults.baseURL = backendBaseUrl;
axios.defaults.withCredentials = true;  // front <-> backend 쿠키공유

// 피드백 조회하기
export const readFeedback = createAsyncThunk('readFeedback', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/feedback/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});