import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { backendBaseUrl } from '../../../config/config';

// axios 기본 설정
axios.defaults.baseURL = backendBaseUrl;
axios.defaults.withCredentials = true;  // front <-> backend 쿠키공유

// article 생성하기
export const postArticle = createAsyncThunk('postArticle', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/article', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// article 수정하기
export const putArticle = createAsyncThunk('putArticle', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put('/article', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});