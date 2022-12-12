import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// axios 기본 설정
axios.defaults.baseURL = process.env.BACKEND_BASE_URL;
axios.defaults.withCredentials = true;  // front <-> backend 쿠키공유

// 푸시 생성하기
export const createPush = createAsyncThunk('createPush', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/push', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 푸시 조회하기
export const readPush = createAsyncThunk('readPush', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/push/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 푸시 수정하기
export const updatePush = createAsyncThunk('updatePush', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put('/push', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 푸시 삭제하기
export const deletePush = createAsyncThunk('deletePush', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/push/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});