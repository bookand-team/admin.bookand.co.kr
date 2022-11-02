import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { backendBaseUrl } from '../../../config/config';

// axios 기본 설정
axios.defaults.baseURL = backendBaseUrl;
axios.defaults.withCredentials = true;  // front <-> backend 쿠키공유

// 서점 생성하기
export const createBookstore = createAsyncThunk('createBookstore', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/bookstore', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 서점 조회하기
export const readBookstore = createAsyncThunk('readBookstore', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/bookstore/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 서점 수정하기
export const updateBookstore = createAsyncThunk('updateBookstore', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put('/bookstore', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 서점 삭제하기
export const deleteBookstore = createAsyncThunk('deleteBookstore', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/bookstore/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});