import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { isAxiosError } from 'axios';

import { LoginReq, RefreshLoginReq } from '@types';

// axios 기본 설정
axios.defaults.baseURL = `${process.env.NEXT_PUBLIC_AXIOS_PROTOCOL}${process.env.NEXT_PUBLIC_AXIOS_HOST}${process.env.NEXT_PUBLIC_AXIOS_COMMON_PATH}`;
axios.defaults.withCredentials = true;  // front <-> backend 쿠키공유

// 로그인
export const login = createAsyncThunk('login', async (data: LoginReq, { rejectWithValue }) => {
  try {
    const response = await axios.post('/auth/login', data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
    return rejectWithValue(error);
  }
});

// 로그인 상태 확인 및 유지
export const refreshLogin = createAsyncThunk('refreshLogin', async (data: RefreshLoginReq, { rejectWithValue }) => {
  try {
    const response = await axios.post('/auth/reissue', data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
    return rejectWithValue(error);
  }
});