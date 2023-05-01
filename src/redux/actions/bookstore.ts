import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosBack } from '@config/axios';
import { ReadBookstoreListReqDTO, ReadBookstoreReqDTO } from '@types';
import { axiosErrorHandler } from '@utils/error_handler';

// 서점 목록 조회
export const readBookstoreList = createAsyncThunk('readBookstoreList', async (data: ReadBookstoreListReqDTO, { rejectWithValue }) => {
  try {
    // 백엔드서버에 서점 목록 조회 요청
    const response = await axiosBack.get('/bookstores/search', { params: data.params, headers: data.headers });
    return response.data;
  } catch (error) {
    return rejectWithValue(axiosErrorHandler(error));
  }
});

// 서점 조회
export const readBookstore = createAsyncThunk('readBookstore', async (data: ReadBookstoreReqDTO, { rejectWithValue }) => {
  try {
    // 백엔드서버에 서점 조회 요청
    const response = await axiosBack.get(`/bookstores/${data.bookstoreId}`, { headers: data.headers });
    return response.data;
  } catch (error) {
    return rejectWithValue(axiosErrorHandler(error));
  }
});