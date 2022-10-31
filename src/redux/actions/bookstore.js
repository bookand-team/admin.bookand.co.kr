import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { backendBaseUrl } from '../../../config/config';

// axios 기본 설정
axios.defaults.baseURL = backendBaseUrl;
axios.defaults.withCredentials = true;  // front <-> backend 쿠키공유

// bookstore 불러오기
export const loadBookstore = createAsyncThunk('loadBookstore', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/bookstore/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});