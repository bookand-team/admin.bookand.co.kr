import { createSlice } from '@reduxjs/toolkit';

import { login, logout, silentLogin } from '@redux/actions/user';
import { UserState } from '@types';

const initialState: UserState = {
  isLoggedIn: false,  // 로그인한 유저인지 확인

  token: null,  // accessToken과 refreshToken 저장
  expired: false,  // accessToken이 만료되었는지 확인

  myInfo: null,  // 내 정보

  // 로그인
  loginLoading: false,
  loginDone: false,
  loginError: false,

  // 토큰 재발행
  silentLoginLoading: false,
  silentLoginDone: false,
  silentLoginError: false,

  // 로그아웃
  logoutLoading: false,
  logoutDone: false,
  logoutError: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginUser: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setExpired: (state) => {
      state.expired = true;
    }
  },
  extraReducers: (builder) => {
    // 로그인
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginDone = false;
      state.loginError = false;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.loginLoading = false;
      state.loginDone = true;
    });
    builder.addCase(login.rejected, (state) => {
      state.loginLoading = false;
      state.loginError = true;
    });
    // 토큰 재발행
    builder.addCase(silentLogin.pending, (state) => {
      state.silentLoginLoading = true;
      state.silentLoginDone = false;
      state.silentLoginError = false;
    });
    builder.addCase(silentLogin.fulfilled, (state) => {
      state.silentLoginLoading = false;
      state.silentLoginDone = true;
    });
    builder.addCase(silentLogin.rejected, (state) => {
      state.silentLoginLoading = false;
      state.silentLoginError = true;
    });
    // 로그아웃
    builder.addCase(logout.pending, (state) => {
      state.logoutLoading = true;
      state.logoutDone = false;
      state.logoutError = false;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.logoutLoading = false;
      state.logoutDone = true;
    });
    builder.addCase(logout.rejected, (state) => {
      state.logoutLoading = false;
      state.logoutError = true;
    });
  }
});

export const { setLoginUser, setToken, setExpired } = userSlice.actions;

export default userSlice;