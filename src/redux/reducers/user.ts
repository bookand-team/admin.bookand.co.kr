import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

import { login } from '@redux/actions/user';
import { isLoginSucRes, UserState } from '@types';

const initialState: UserState = {
  isLoggedIn: false,
  accessToken: null,
  myInfo: null,

  // 로그인
  loginLoading: false,
  loginDone: null,
  loginError: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginUser: (state, action) => {
      state.isLoggedIn = true;
      state.accessToken = action.payload;
      state.myInfo = jwt.decode(action.payload);
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
      if (isLoginSucRes(action.payload)) {
        Cookies.set('refreshToken', action.payload.refreshToken);
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginLoading = false;
      state.loginError = action.payload;
    });
  }
});

export const { setLoginUser } = userSlice.actions;

export default userSlice;