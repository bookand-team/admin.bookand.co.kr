import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  section: null,
  search: null,
  page: null,
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.section = action.payload.section ? action.payload.section : null;
      state.search = action.payload.search ? action.payload.search : null;
      state.page = action.payload.page ? action.payload.page : null;
    },
  },
});

export const { setPage } = pageSlice.actions;

export default pageSlice;