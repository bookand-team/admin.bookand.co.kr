import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// axios 기본 설정
axios.defaults.baseURL = process.env.BACKEND_BASE_URL;
axios.defaults.withCredentials = true;  // front <-> backend 쿠키공유

// 여러 피드백 조회하기
export const readFeedbacks = createAsyncThunk('readFeedbacks', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/feedbacks', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 여러 피드백 삭제하기
export const deleteFeedbacks = createAsyncThunk('deleteFeedbacks', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.delete('/feedbacks', { data });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});