import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

import { axiosBack } from '@config/axios';
import { LoginReqDTO } from '@types';

// 로그인
export const login = createAsyncThunk('login', async (data: LoginReqDTO, { rejectWithValue }) => {
  try {
    const response = await axiosBack.post('/auth/admin', data);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
    return rejectWithValue(error);
  }
});