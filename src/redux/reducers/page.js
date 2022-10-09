import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  section: null,
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.section = action.payload.section ? action.payload.section : null;
    },
  },
});

export const { setPage } = pageSlice.actions;

export default pageSlice;