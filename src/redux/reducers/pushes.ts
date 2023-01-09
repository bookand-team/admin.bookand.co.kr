import { createSlice } from '@reduxjs/toolkit';

import { dummyPushes } from '@assets/dummy';
import { readPushes, deletePushes } from '@redux/actions/pushes';
import { PushesState } from '@types';

const initialState: PushesState = {
  pushes: null,
  pushesLength: null,

  readPushesLoading: false,
  readPushesDone: null,
  readPushesError: null,

  deletePushesLoading: false,
  deletePushesDone: null,
  deletePushesError: null
};

const pushesSlice = createSlice({
  name: 'pushes',
  initialState,
  reducers: {
    loadDummyPushes: (state, action) => {
      state.pushes = action.payload.page
        ? dummyPushes.slice((action.payload.page - 1) * 10, action.payload.page * 10)
        : dummyPushes.slice(0, 10);
      state.pushesLength = dummyPushes.length;
    }
  },
  extraReducers: (builder) => {
    // 여러 푸시 조회하기
    builder.addCase(readPushes.pending, (state) => {
      state.readPushesLoading = true;
      state.readPushesDone = null;
      state.readPushesError = null;
    });
    builder.addCase(readPushes.fulfilled, (state, action) => {
      state.readPushesLoading = false;
      state.readPushesDone = action.payload;
    });
    builder.addCase(readPushes.rejected, (state, action) => {
      state.readPushesLoading = false;
      state.readPushesError = action.payload;
    });
    // 여러 푸시 삭제하기
    builder.addCase(deletePushes.pending, (state) => {
      state.deletePushesLoading = true;
      state.deletePushesDone = null;
      state.deletePushesError = null;
    });
    builder.addCase(deletePushes.fulfilled, (state, action) => {
      state.deletePushesLoading = false;
      state.deletePushesDone = action.payload;
    });
    builder.addCase(deletePushes.rejected, (state, action) => {
      state.deletePushesLoading = false;
      state.deletePushesError = action.payload;
    });
  }
});

export const { loadDummyPushes } = pushesSlice.actions;

export default pushesSlice;