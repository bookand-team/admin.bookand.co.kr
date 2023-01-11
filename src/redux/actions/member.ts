import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

// axios 기본 설정
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_AXIOS_PROTOCOL}${process.env.NEXT_PUBLIC_AXIOS_HOST}${process.env.NEXT_PUBLIC_AXIOS_COMMON_PATH}`;
axios.defaults.withCredentials = true;  // front <-> backend 쿠키공유

// 멤버 조회하기
export const readMember = createAsyncThunk('readMember', async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/member/${id}`);
    return response.data;
  } catch (error) {
    return rejectWithValue((error as AxiosError).response?.data);
  }
});

// 멤버 수정하기
export const updateMember = createAsyncThunk('updateMember', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.put('/member', data);
    return response.data;
  } catch (error) {
    return rejectWithValue((error as AxiosError).response?.data);
  }
});