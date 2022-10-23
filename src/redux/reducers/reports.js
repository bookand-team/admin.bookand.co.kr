import { createSlice } from '@reduxjs/toolkit';

import { dummyReports } from '../../hooks/dummy_data';

const initialState = {
  reports: null,
  reportsLength: null,
};

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    loadDummyReports: (state, action) => {
      state.reports = action.payload.page
        ? dummyReports.slice((action.payload.page - 1) * 10, action.payload.page * 10)
        : dummyReports.slice(0, 10);
      state.reportsLength = dummyReports.length;
    },
  },
});

export const { loadDummyReports } = reportsSlice.actions;

export default reportsSlice;