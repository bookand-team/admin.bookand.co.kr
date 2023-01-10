import { createSlice } from '@reduxjs/toolkit';

import { login, refreshLogin } from '@redux/actions/user';
import { UserState } from '@types';

const initialState: UserState = {
  isLoggedIn: false,
  accessToken: null,
  myInfo: null,

  // 로그인
  loginLoading: false,
  loginDone: null,
  loginError: null,

  // 로그인 상태 확인 및 유지
  refreshLoginLoading: false,
  refreshLoginDone: null,
  refreshLoginError: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccessTokne: (state, action) => {
      state.accessToken = action.payload;
    }
  },
  extraReducers: (builder) => {
    // 로그인
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginDone = null;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginLoading = false;
      state.loginDone = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginLoading = false;
      state.loginError = action.payload;
    });
    // 로그인 상태 확인 및 유지
    builder.addCase(refreshLogin.pending, (state) => {
      state.refreshLoginLoading = true;
      state.refreshLoginDone = null;
      state.refreshLoginError = null;
    });
    builder.addCase(refreshLogin.fulfilled, (state, action) => {
      state.refreshLoginLoading = false;
      state.refreshLoginDone = action.payload;
    });
    builder.addCase(refreshLogin.rejected, (state, action) => {
      state.refreshLoginLoading = false;
      state.refreshLoginError = action.payload;
    });
  }
});

export const { setAccessTokne } = userSlice.actions;

export default userSlice;