import { createSlice } from '@reduxjs/toolkit';

import { login } from '@redux/actions/user';
import { UserState } from '@types';

const initialState: UserState = {
  isLoggedIn: false,
  token: null,
  myInfo: null,

  // 로그인
  loginLoading: false,
  loginDone: false,
  loginError: false
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
  }
});

export const { setLoginUser } = userSlice.actions;

export default userSlice;