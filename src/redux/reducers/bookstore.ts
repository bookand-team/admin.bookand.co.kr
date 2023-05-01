import { createSlice } from '@reduxjs/toolkit';

import { readBookstore, readBookstoreList } from '@redux/actions/bookstore';
import { BookstoreState } from '@types';

const initialState: BookstoreState = {
  bookstore: null,
  bookstoreList: null,

  // 서점 목록 조회
  readBookstoreListDone: false,
  readBookstoreListError: null,

  // 서점 조회
  readBookstoreDone: false,
  readBookstoreError: null
};

const bookstoreSlice = createSlice({
  name: 'bookstore',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    // 서점 목록 조회
    builder.addCase(readBookstoreList.fulfilled, (state, action) => {
      state.readBookstoreListDone = true;
      state.readBookstoreListError = null;
      state.bookstoreList = action.payload.bookstore;
    });
    builder.addCase(readBookstoreList.rejected, (state, action) => {
      state.readBookstoreListDone = false;
      state.readBookstoreListError = action.payload;
    });
    // 서점 조회
    builder.addCase(readBookstore.fulfilled, (state, action) => {
      state.readBookstoreDone = true;
      state.readBookstoreError = null;
      state.bookstore = action.payload;
    });
    builder.addCase(readBookstore.rejected, (state, action) => {
      state.readBookstoreDone = false;
      state.readBookstoreError = action.payload;
    });
  }
});

export default bookstoreSlice;