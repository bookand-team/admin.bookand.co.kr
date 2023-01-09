import { createSlice } from '@reduxjs/toolkit';

import { login } from '@redux/actions/user';
import { UserState } from '@types';

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
  }
});

export const { setAccessTokne } = userSlice.actions;

export default userSlice;