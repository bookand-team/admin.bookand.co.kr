import { createSlice } from '@reduxjs/toolkit';

import { loadBookstore } from '../actions/bookstore';

const initialState = {
  bookstore: null,

  loadBookstoreLoading: null,
  loadBookstoreDone: null,
  loadBookstoreError: null,
};

const bookstoreSlice = createSlice({
  name: 'bookstore',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    // bookstore 불러오기
    builder.addCase(loadBookstore.pending, (state) => {
      state.loadBookstoreLoading = true;
      state.loadBookstoreDone = null;
      state.loadBookstoreError = null;
    })
    builder.addCase(loadBookstore.fulfilled, (state, action) => {
      state.loadBookstoreLoading = false;
      state.loadBookstoreDone = action.payload.message ? action.payload.message : true;
      state.bookstore = action.payload.bookstore;
    })
    builder.addCase(loadBookstore.rejected, (state, action) => {
      state.loadBookstoreLoading = false;
      state.loadBookstoreError = action.payload.message ? action.payload.message : true;
    })
  }
});

export default bookstoreSlice;