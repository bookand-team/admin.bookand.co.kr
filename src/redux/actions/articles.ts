import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import type { AxiosError } from 'axios';

// axios 기본 설정
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
axios.defaults.withCredentials = true;  // front <-> backend 쿠키공유

// 여러 아티클 조회하기
export const readArticles = createAsyncThunk('readArticles', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/articles', data);
    return response.data;
  } catch (error) {
    return rejectWithValue((error as AxiosError).response?.data);
  }
});

// 여러 아티클 삭제하기
export const deleteArticles = createAsyncThunk('deleteArticles', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.delete('/articles', { data });
    return response.data;
  } catch (error) {
    return rejectWithValue((error as AxiosError).response?.data);
  }
});