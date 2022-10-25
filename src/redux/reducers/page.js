import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  section: null,
  category: null,
  theme: null,
  page: null,
  role: null,
  row: null,
  search: null,
  status: null,
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.section = action.payload.section ? action.payload.section : null;
      state.category = action.payload.category ? action.payload.category : null;
      state.theme = action.payload.theme ? action.payload.theme : null;
      state.page = action.payload.page ? action.payload.page : null;
      state.role = action.payload.role ? action.payload.role : null;
      state.row = action.payload.row ? action.payload.row : null;
      state.search = action.payload.search ? action.payload.search : null;
      state.status = action.payload.status ? action.payload.status : null;
    },
  },
});

export const { setPage } = pageSlice.actions;

export default pageSlice;