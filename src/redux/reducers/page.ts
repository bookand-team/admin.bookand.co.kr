import { createSlice } from '@reduxjs/toolkit';

import type { PageState } from 'src/types';

const initialState: PageState = {
  section: null,
  category: null,
  theme: null,
  page: 1,
  role: null,
  row: 0,
  search: null,
  status: null
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.section = action.payload.section ? action.payload.section : null;
      state.category = action.payload.category ? action.payload.category : null;
      state.theme = action.payload.theme ? action.payload.theme : null;
      state.page = action.payload.page ? action.payload.page : 1;
      state.role = action.payload.role ? action.payload.role : null;
      state.row = action.payload.row ? action.payload.row : 0;
      state.search = action.payload.search ? action.payload.search : null;
      state.status = action.payload.status ? action.payload.status : null;
    }
  }
});

export const { setPage } = pageSlice.actions;

export default pageSlice;