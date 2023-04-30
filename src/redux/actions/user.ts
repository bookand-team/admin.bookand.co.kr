import { createAsyncThunk } from '@reduxjs/toolkit';

import { deleteTokenInCookies, storeTokenInCookies } from '@api/user';
import { axiosBack } from '@config/axios';
import { LoginReqDTO, reissueTokenReqDTO, isToken } from '@types';
import { axiosErrorHandler } from '@utils/error_handler';

// 로그인
export const login = createAsyncThunk('login', async (data: LoginReqDTO, { rejectWithValue }) => {
  try {
    // 백엔드서버에 로그인 요청
    const response = await axiosBack.post('/auth/admin', data);
    const tokenData = response.data;

    // 응답 데이터가 토큰 형식이 아닌 경우
    if (!(tokenData && isToken(tokenData))) {
      return rejectWithValue('Error: Response is not token type');
    }

    // 프론트서버에 토큰 저장 요청
    const result = await storeTokenInCookies(tokenData);

    // 토큰 저장 성공시 토큰 반환
    if (result) { return tokenData; }
    else { return rejectWithValue('Error: Failed to store token'); }
  } catch (error) {
    return rejectWithValue(axiosErrorHandler(error));
  }
});

// 토큰 재발행
export const reissueToken = createAsyncThunk('reissueToken', async (data: reissueTokenReqDTO, { rejectWithValue }) => {
  try {
    // 백엔드서버에 토큰 재발행 요청
    const response = await axiosBack.post('/auth/reissue', data);
    const tokenData = response.data;

    // 응답 데이터가 토큰 형식이 아닌 경우
    if (!(tokenData && isToken(tokenData))) {
      return rejectWithValue('Error: Response is not token type');
    }

    // 프론트서버에 토큰 저장 요청
    const result = await storeTokenInCookies(tokenData);

    // 토큰 저장 성공시 토큰 반환
    if (result) { return tokenData; }
    else { return rejectWithValue('Error: Failed to store token'); }
  } catch (error) {
    return rejectWithValue(axiosErrorHandler(error));
  }
});

// 로그아웃
export const logout = createAsyncThunk('logout', async (data, { rejectWithValue }) => {
  try {
    // 프론트서버에 토큰 삭제 요청
    const result = await deleteTokenInCookies();

    // 토큰 삭제 성공시 true 반환
    if (result) { return true; }
    else { return rejectWithValue('Error: Failed to delete token'); }
  } catch (error) {
    return rejectWithValue(axiosErrorHandler(error));
  }
});