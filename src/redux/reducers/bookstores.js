import { createSlice } from '@reduxjs/toolkit';

import { dummyBookstores } from '../../hooks/dummy_data';

const initialState = {
  bookstores: null,
  bookstoresLength: null,
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
    },
  },
});

export const { loadDummyBookstores } = bookstoresSlice.actions;

export default bookstoresSlice;