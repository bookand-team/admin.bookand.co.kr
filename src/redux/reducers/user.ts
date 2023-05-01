import { createSlice } from '@reduxjs/toolkit';

import { login, logout, reissueToken } from '@redux/actions/user';
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
  reissueTokenLoading: false,
  reissueTokenDone: false,
  reissueTokenError: false,

  // 로그아웃
  logoutLoading: false,
  logoutDone: false,
  logoutError: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: {
      payload: Pick<UserState, 'isLoggedIn' | 'token' | 'expired'>;
      type: string;
    }) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
      state.expired = action.payload.expired;
    },
    setExpired: (state, action) => {
      state.expired = action.payload;
    }
  },
  extraReducers: (builder) => {
    // 로그인
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginDone = false;
      state.loginError = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginLoading = false;
      state.loginDone = true;
      state.token = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginLoading = false;
      state.loginError = action.payload;
    });
    // 토큰 재발행
    builder.addCase(reissueToken.pending, (state) => {
      state.reissueTokenLoading = true;
      state.reissueTokenDone = false;
      state.reissueTokenError = false;
    });
    builder.addCase(reissueToken.fulfilled, (state, action) => {
      state.reissueTokenLoading = false;
      state.reissueTokenDone = true;
      state.token = action.payload;
      state.expired = false;
    });
    builder.addCase(reissueToken.rejected, (state, action) => {
      state.reissueTokenLoading = false;
      state.reissueTokenError = action.payload;
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
    builder.addCase(logout.rejected, (state, action) => {
      state.logoutLoading = false;
      state.logoutError = action.payload;
    });
  }
});

export const { setUser, setExpired } = userSlice.actions;

export default userSlice;