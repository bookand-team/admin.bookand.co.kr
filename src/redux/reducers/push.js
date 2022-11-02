import { createSlice } from '@reduxjs/toolkit';

import { createPush, readPush, updatePush, deletePush } from '../actions/push';

const initialState = {
  push: null,

  createPushLoading: null,
  createPushDone: null,
  createPushError: null,

  readPushLoading: null,
  readPushDone: null,
  readPushError: null,

  updatePushLoading: null,
  updatePushDone: null,
  updatePushError: null,

  deletePushLoading: null,
  deletePushDone: null,
  deletePushError: null,
};

const pushSlice = createSlice({
  name: 'push',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    // 푸시 생성하기
    builder.addCase(createPush.pending, (state) => {
      state.createPushLoading = true;
      state.createPushDone = null;
      state.createPushError = null;
    })
    builder.addCase(createPush.fulfilled, (state, action) => {
      state.createPushLoading = false;
      state.createPushDone = action.payload.message ? action.payload.message : true;
    })
    builder.addCase(createPush.rejected, (state, action) => {
      state.createPushLoading = false;
      state.createPushError = action.payload.message ? action.payload.message : true;
    })
    // 푸시 조회하기
    builder.addCase(readPush.pending, (state) => {
      state.readPushLoading = true;
      state.readPushDone = null;
      state.readPushError = null;
    })
    builder.addCase(readPush.fulfilled, (state, action) => {
      state.readPushLoading = false;
      state.readPushDone = action.payload.message ? action.payload.message : true;
      state.push = action.payload.push;
    })
    builder.addCase(readPush.rejected, (state, action) => {
      state.readPushLoading = false;
      state.readPushError = action.payload.message ? action.payload.message : true;
    })
    // 푸시 수정하기
    builder.addCase(updatePush.pending, (state) => {
      state.updatePushLoading = true;
      state.updatePushDone = null;
      state.updatePushError = null;
    })
    builder.addCase(updatePush.fulfilled, (state, action) => {
      state.updatePushLoading = false;
      state.updatePushDone = action.payload.message ? action.payload.message : true;
    })
    builder.addCase(updatePush.rejected, (state, action) => {
      state.updatePushLoading = false;
      state.updatePushError = action.payload.message ? action.payload.message : true;
    })
    // 푸시 삭제하기
    builder.addCase(deletePush.pending, (state) => {
      state.deletePushLoading = true;
      state.deletePushDone = null;
      state.deletePushError = null;
    })
    builder.addCase(deletePush.fulfilled, (state, action) => {
      state.deletePushLoading = false;
      state.deletePushDone = action.payload.message ? action.payload.message : true;
    })
    builder.addCase(deletePush.rejected, (state, action) => {
      state.deletePushLoading = false;
      state.deletePushError = action.payload.message ? action.payload.message : true;
    })
  }
});

export default pushSlice;