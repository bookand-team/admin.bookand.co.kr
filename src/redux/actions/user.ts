import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

import { axiosBack, axiosFront } from '@config/axios';
import { LoginReqDTO, SilentLoginReqDTO, isLoginSucRes } from '@types';

// 로그인
export const login = createAsyncThunk('login', async (data: LoginReqDTO, { rejectWithValue }) => {
  try {
    // 백엔드서버에 로그인 요청
    const response = await axiosBack.post('/auth/admin', data);
    const tokenData = response.data;

    // 응답 데이터가 토큰 형식이 아닌 경우
    if (!(tokenData && isLoginSucRes(tokenData))) {
      return 'Error: token type error';
    }
    // 프론트서버에 토큰 저장 요청
    await axiosFront.post('/user/login', tokenData);
    return 'login success';
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
    return rejectWithValue(error);
  }
});

// 토큰 재발행
export const silentLogin = createAsyncThunk('silentLogin', async (data: SilentLoginReqDTO, { rejectWithValue }) => {
  try {
    // 백엔드서버에 토큰 재발행 요청
    const response = await axiosBack.post('/auth/reissue', data);
    const tokenData = response.data;

    // 응답 데이터가 토큰 형식이 아닌 경우
    if (!(tokenData && isLoginSucRes(tokenData))) {
      return 'Error: token type error';
    }
    // 프론트서버에 토큰 저장 요청
    await axiosFront.post('/user/login', tokenData);
    return 'reissue success';
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
    return rejectWithValue(error);
  }
});

// 로그아웃
export const logout = createAsyncThunk('logout', async (data, { rejectWithValue }) => {
  try {
    // 프론트서버에 토큰 삭제 요청
    await axiosFront.get('/user/logout');
    return 'logout success';
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
    return rejectWithValue(error);
  }
});