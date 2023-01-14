import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

import { axiosBack } from '@config/axios';

// 이미지 url 생성하기
export const createImageUrl = createAsyncThunk('createImageUrl', async (form_data, { rejectWithValue }) => {
  try {
    const response = await axiosBack.post('/image', { form_data }, { headers: { 'Content-Type': 'multipart/form-data' } });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
    return rejectWithValue(error);
  }
});