import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reports: [
    {
      id: '0001',
      email: 'emailEx01@gmail.com',
      bookstoreName: '땡스북스',
      reportedNumber: 3,
      status: '노출',
      createdDate: '2022-10-09 00:12',
      exposedDate: '2022-10-09 00:12',
    },
    {
      id: '0002',
      email: 'emailEx02@apple.com',
      bookstoreName: '서점 리스본',
      reportedNumber: 1,
      status: '미노출',
      createdDate: '2022-10-09 00:12',
      exposedDate: '2022-10-09 00:12',
    },
    {
      id: '0003',
      email: 'emailEx03@gmail.com',
      status: '삭제',
    },
  ],
  reportsLength: 3,
};

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {

  },
});

export default reportsSlice;