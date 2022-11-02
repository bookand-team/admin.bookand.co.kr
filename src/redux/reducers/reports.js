import { createSlice } from '@reduxjs/toolkit';

import { dummyReports } from '../../hooks/dummy_data';
import { readReports } from '../actions/reports';

const initialState = {
  reports: null,
  reportsLength: null,

  readReportsLoading: null,
  readReportsDone: null,
  readReportsError: null,
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
  extraReducers: (builder) => {
    // 여러 제보 조회하기
    builder.addCase(readReports.pending, (state) => {
      state.readReportsLoading = true;
      state.readReportsDone = null;
      state.readReportsError = null;
    })
    builder.addCase(readReports.fulfilled, (state, action) => {
      state.readReportsLoading = false;
      state.readReportsDone = action.payload.message ? action.payload.message : true;
      state.reports = action.payload.reports;
      state.reportsLength = action.payload.reports_length;
    })
    builder.addCase(readReports.rejected, (state, action) => {
      state.readReportsLoading = false;
      state.readReportsError = action.payload.message ? action.payload.message : true;
    })
  }
});

export const { loadDummyReports } = reportsSlice.actions;

export default reportsSlice;