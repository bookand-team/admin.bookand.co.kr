import { createSlice } from '@reduxjs/toolkit';

import { dummyBookstores } from '@assets/dummy';
import { readBookstores, deleteBookstores } from '@redux/actions/bookstores';
import { BookstoresState } from '@types';

const initialState: BookstoresState = {
  bookstores: null,
  bookstoresLength: null,

  readBookstoresLoading: false,
  readBookstoresDone: null,
  readBookstoresError: null,

  deleteBookstoresLoading: false,
  deleteBookstoresDone: null,
  deleteBookstoresError: null
};

const bookstoresSlice = createSlice({
  name: 'bookstores',
  initialState,
  reducers: {
    loadDummyBookstores: (state, action) => {
      state.bookstores = action.payload.page
        ? dummyBookstores.slice((action.payload.page - 1) * 10, action.payload.page * 10)
        : dummyBookstores.slice(0, 10);
      state.bookstoresLength = dummyBookstores.length;
    }
  },
  extraReducers: (builder) => {
    // 여러 서점 조회하기
    builder.addCase(readBookstores.pending, (state) => {
      state.readBookstoresLoading = true;
      state.readBookstoresDone = null;
      state.readBookstoresError = null;
    });
    builder.addCase(readBookstores.fulfilled, (state, action) => {
      state.readBookstoresLoading = false;
      state.readBookstoresDone = action.payload;
    });
    builder.addCase(readBookstores.rejected, (state, action) => {
      state.readBookstoresLoading = false;
      state.readBookstoresError = action.payload;
    });
    // 여러 서점 삭제하기
    builder.addCase(deleteBookstores.pending, (state) => {
      state.deleteBookstoresLoading = true;
      state.deleteBookstoresDone = null;
      state.deleteBookstoresError = null;
    });
    builder.addCase(deleteBookstores.fulfilled, (state, action) => {
      state.deleteBookstoresLoading = false;
      state.deleteBookstoresDone = action.payload;
    });
    builder.addCase(deleteBookstores.rejected, (state, action) => {
      state.deleteBookstoresLoading = false;
      state.deleteBookstoresError = action.payload;
    });
  }
});

export const { loadDummyBookstores } = bookstoresSlice.actions;

export default bookstoresSlice;