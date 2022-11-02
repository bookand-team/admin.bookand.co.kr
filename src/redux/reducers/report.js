import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  report: null,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {

  }
});

export default reportSlice;