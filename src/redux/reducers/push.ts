import { createSlice } from '@reduxjs/toolkit';

import { dummyPushes } from '@assets/dummy';
import { createPush, readPush, updatePush, deletePush } from '@redux/actions/push';
import { PushState } from '@types';

const initialState: PushState = {
  push: null,

  createPushLoading: false,
  createPushDone: null,
  createPushError: null,

  readPushLoading: false,
  readPushDone: null,
  readPushError: null,

  updatePushLoading: false,
  updatePushDone: null,
  updatePushError: null,

  deletePushLoading: false,
  deletePushDone: null,
  deletePushError: null
};

const pushSlice = createSlice({
  name: 'push',
  initialState,
  reducers: {
    loadDummyPush: (state, action) => {
      state.push = dummyPushes[action.payload - 1];
    }
  },
  extraReducers: (builder) => {
    // 푸시 생성하기
    builder.addCase(createPush.pending, (state) => {
      state.createPushLoading = true;
      state.createPushDone = null;
      state.createPushError = null;
    });
    builder.addCase(createPush.fulfilled, (state, action) => {
      state.createPushLoading = false;
      state.createPushDone = action.payload;
    });
    builder.addCase(createPush.rejected, (state, action) => {
      state.createPushLoading = false;
      state.createPushError = action.payload;
    });
    // 푸시 조회하기
    builder.addCase(readPush.pending, (state) => {
      state.readPushLoading = true;
      state.readPushDone = null;
      state.readPushError = null;
    });
    builder.addCase(readPush.fulfilled, (state, action) => {
      state.readPushLoading = false;
      state.readPushDone = action.payload;
    });
    builder.addCase(readPush.rejected, (state, action) => {
      state.readPushLoading = false;
      state.readPushError = action.payload;
    });
    // 푸시 수정하기
    builder.addCase(updatePush.pending, (state) => {
      state.updatePushLoading = true;
      state.updatePushDone = null;
      state.updatePushError = null;
    });
    builder.addCase(updatePush.fulfilled, (state, action) => {
      state.updatePushLoading = false;
      state.updatePushDone = action.payload;
    });
    builder.addCase(updatePush.rejected, (state, action) => {
      state.updatePushLoading = false;
      state.updatePushError = action.payload;
    });
    // 푸시 삭제하기
    builder.addCase(deletePush.pending, (state) => {
      state.deletePushLoading = true;
      state.deletePushDone = null;
      state.deletePushError = null;
    });
    builder.addCase(deletePush.fulfilled, (state, action) => {
      state.deletePushLoading = false;
      state.deletePushDone = action.payload;
    });
    builder.addCase(deletePush.rejected, (state, action) => {
      state.deletePushLoading = false;
      state.deletePushError = action.payload;
    });
  }
});

export const { loadDummyPush } = pushSlice.actions;

export default pushSlice;