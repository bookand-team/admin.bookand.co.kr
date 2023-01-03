import { createSlice } from '@reduxjs/toolkit';

import { dummyPushes } from '../../dummy_data';
import { readPushes, deletePushes } from '../actions/pushes';

export type PushesState = {
  pushes: any;
  pushesLength: number | null;

  readPushesLoading: boolean;
  readPushesDone: any;
  readPushesError: any;

  deletePushesLoading: boolean;
  deletePushesDone: any;
  deletePushesError: any;
};

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
      state.readPushesDone = action.payload.message ? action.payload.message : true;
      state.pushes = action.payload.pushes;
      state.pushesLength = action.payload.pushes_length;
    });
    builder.addCase(readPushes.rejected, (state, action) => {
      state.readPushesLoading = false;
      state.readPushesError = action.payload.message ? action.payload.message : true;
    });
    // 여러 푸시 삭제하기
    builder.addCase(deletePushes.pending, (state) => {
      state.deletePushesLoading = true;
      state.deletePushesDone = null;
      state.deletePushesError = null;
    });
    builder.addCase(deletePushes.fulfilled, (state, action) => {
      state.deletePushesLoading = false;
      state.deletePushesDone = action.payload.message ? action.payload.message : true;
    });
    builder.addCase(deletePushes.rejected, (state, action) => {
      state.deletePushesLoading = false;
      state.deletePushesError = action.payload.message ? action.payload.message : true;
    });
  }
});

export const { loadDummyPushes } = pushesSlice.actions;

export default pushesSlice;