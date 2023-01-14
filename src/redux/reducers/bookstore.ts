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

  }
});

export default bookstoreSlice;