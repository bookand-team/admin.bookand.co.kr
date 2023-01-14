import { createSlice } from '@reduxjs/toolkit';

import { ReportState } from '@types';

const initialState: ReportState = {
  report: null,

  reports: null,
  reportsLength: null
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setReport: (state, action) => {
      state.report = action.payload.report;
    },
    setReports: (state, action) => {
      state.reports = action.payload.reports;
      state.reportsLength = action.payload.reportsLength;
    }
  }
});

export const { setReport, setReports } = reportSlice.actions;

export default reportSlice;