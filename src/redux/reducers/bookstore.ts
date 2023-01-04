import { createSlice } from '@reduxjs/toolkit';

import { dummyBookstores } from '../../dummy_data';
import { createBookstore, readBookstore, updateBookstore, deleteBookstore } from '../actions/bookstore';

import type { BookstoreState } from 'src/types';

const initialState: BookstoreState = {
  bookstore: null,

  createBookstoreLoading: false,
  createBookstoreDone: null,
  createBookstoreError: null,

  readBookstoreLoading: false,
  readBookstoreDone: null,
  readBookstoreError: null,

  updateBookstoreLoading: false,
  updateBookstoreDone: null,
  updateBookstoreError: null,

  deleteBookstoreLoading: false,
  deleteBookstoreDone: null,
  deleteBookstoreError: null
};

const bookstoreSlice = createSlice({
  name: 'bookstore',
  initialState,
  reducers: {
    loadDummyBookstore: (state, action) => {
      state.bookstore = dummyBookstores[action.payload - 1];
    }
  },
  extraReducers: (builder) => {
    // 서점 생성하기
    builder.addCase(createBookstore.pending, (state) => {
      state.createBookstoreLoading = true;
      state.createBookstoreDone = null;
      state.createBookstoreError = null;
    });
    builder.addCase(createBookstore.fulfilled, (state, action) => {
      state.createBookstoreLoading = false;
      state.createBookstoreDone = action.payload.id ? action.payload.id : true;
    });
    builder.addCase(createBookstore.rejected, (state, action) => {
      state.createBookstoreLoading = false;
      state.createBookstoreError = action.payload.message ? action.payload.message : true;
    });
    // 서점 조회하기
    builder.addCase(readBookstore.pending, (state) => {
      state.readBookstoreLoading = true;
      state.readBookstoreDone = null;
      state.readBookstoreError = null;
    });
    builder.addCase(readBookstore.fulfilled, (state, action) => {
      state.readBookstoreLoading = false;
      state.readBookstoreDone = action.payload.message ? action.payload.message : true;
      state.bookstore = action.payload.bookstore;
    });
    builder.addCase(readBookstore.rejected, (state, action) => {
      state.readBookstoreLoading = false;
      state.readBookstoreError = action.payload.message ? action.payload.message : true;
    });
    // 서점 수정하기
    builder.addCase(updateBookstore.pending, (state) => {
      state.updateBookstoreLoading = true;
      state.updateBookstoreDone = null;
      state.updateBookstoreError = null;
    });
    builder.addCase(updateBookstore.fulfilled, (state, action) => {
      state.updateBookstoreLoading = false;
      state.updateBookstoreDone = action.payload.id ? action.payload.id : true;
    });
    builder.addCase(updateBookstore.rejected, (state, action) => {
      state.updateBookstoreLoading = false;
      state.updateBookstoreError = action.payload.message ? action.payload.message : true;
    });
    // 서점 삭제하기
    builder.addCase(deleteBookstore.pending, (state) => {
      state.deleteBookstoreLoading = true;
      state.deleteBookstoreDone = null;
      state.deleteBookstoreError = null;
    });
    builder.addCase(deleteBookstore.fulfilled, (state, action) => {
      state.deleteBookstoreLoading = false;
      state.deleteBookstoreDone = action.payload.message ? action.payload.message : true;
    });
    builder.addCase(deleteBookstore.rejected, (state, action) => {
      state.deleteBookstoreLoading = false;
      state.deleteBookstoreError = action.payload.message ? action.payload.message : true;
    });
  }
});

export const { loadDummyBookstore } = bookstoreSlice.actions;

export default bookstoreSlice;