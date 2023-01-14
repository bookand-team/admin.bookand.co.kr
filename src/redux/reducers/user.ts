import { createSlice } from '@reduxjs/toolkit';

import { login } from '@redux/actions/user';
import { isLoginSucRes, UserState } from '@types';

const initialState: UserState = {
  isLoggedIn: false,
  token: null,
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
      state.token = action.payload;
    }
  },
  extraReducers: (builder) => {
    // 로그인
    builder.addCase(login.pending, (state) => {
      state.loginLoading = true;
      state.loginDone = false;
      state.loginError = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginLoading = false;
      state.loginDone = action.payload;
      if (isLoginSucRes(action.payload)) {
        state.token = action.payload;
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