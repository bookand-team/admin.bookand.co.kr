import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// axios 기본 설정
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;
axios.defaults.withCredentials = true;  // front <-> backend 쿠키공유

// 멤버 조회하기
export const readMember = createAsyncThunk('readMember', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/member/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// 멤버 수정하기
export const updateMember = createAsyncThunk('updateMember', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put('/member', data);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});