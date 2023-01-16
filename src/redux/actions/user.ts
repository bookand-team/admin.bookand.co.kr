import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

import { axiosFront } from '@config/axios';
import { LoginReqDTO, SilentLoginReqDTO } from '@types';

// 로그인
export const login = createAsyncThunk('login', async (data: LoginReqDTO, { rejectWithValue }) => {
  try {
    const response = await axiosFront.post('/user/login', data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
    return rejectWithValue(error);
  }
});

// 로그인
export const silentLogin = createAsyncThunk('silentLogin', async (data: SilentLoginReqDTO, { rejectWithValue }) => {
  try {
    const response = await axiosFront.post('/user/silent', data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
    return rejectWithValue(error);
  }
});