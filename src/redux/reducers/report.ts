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

  }
});

export default reportSlice;