import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { backendBaseUrl } from '../../../config/config';

// axios 기본 설정
axios.defaults.baseURL = backendBaseUrl;
axios.defaults.withCredentials = true;  // front <-> backend 쿠키공유

// articles 불러오기
export const loadArticles = createAsyncThunk('loadArticles', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/articles', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// articles 삭제하기
export const deleteArticles = createAsyncThunk('deleteArticles', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.delete('/articles', { data });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});