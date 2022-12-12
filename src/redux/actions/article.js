import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// axios 기본 설정
axios.defaults.baseURL = process.env.BACKEND_BASE_URL;
axios.defaults.withCredentials = true;  // front <-> backend 쿠키공유

// 아티클 생성하기
export const createArticle = createAsyncThunk('createArticle', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/article', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 아티클 조회하기
export const readArticle = createAsyncThunk('readArticle', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/article/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 아티클 수정하기
export const updateArticle = createAsyncThunk('updateArticle', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put('/article', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 아티클 삭제하기
export const deleteArticle = createAsyncThunk('deleteArticle', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`/article/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});