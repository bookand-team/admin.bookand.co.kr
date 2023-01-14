import { createSlice } from '@reduxjs/toolkit';

import { BookstoreState } from '@types';

const initialState: BookstoreState = {
  bookstore: null,

  bookstores: null,
  bookstoresLength: null
};

const bookstoreSlice = createSlice({
  name: 'bookstore',
  initialState,
  reducers: {
    setBookstore: (state, action) => {
      state.bookstore = action.payload.bookstore;
    },
    setBookstores: (state, action) => {
      state.bookstores = action.payload.bookstores;
      state.bookstoresLength = action.payload.bookstoresLength;
    }
  }
});

export const { setBookstore, setBookstores } = bookstoreSlice.actions;

export default bookstoreSlice;