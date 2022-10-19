import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  members: [
    {
      id: '0001',
      nickname: 'nickEx01',
      status: 'activated',
      type: '일반',
      email: 'emailEx01@gmail.com',
      createdDate: '2022-10-09 00:12',
      connectedDate: '2022-10-12 00:12',
    },
    {
      id: '0002',
      nickname: 'nickEx02',
      status: 'activated',
      type: '관리자',
      email: 'emailEx02@gmail.com',
      createdDate: '2022-10-09 00:12',
      connectedDate: '2022-10-12 00:12',
    },
    {
      id: '0003',
      nickname: 'nickEx03',
      status: 'activated',
      type: '일반',
      email: 'emailEx03@gmail.com',
      createdDate: '2022-10-09 00:12',
      connectedDate: '2022-10-12 00:12',
    },
    {
      id: '0004',
      nickname: 'nickEx04',
      status: 'activated',
      type: '일반',
      email: 'emailEx04@gmail.com',
      createdDate: '2022-10-09 00:12',
      connectedDate: '2022-10-12 00:12',
    },
    {
      id: '0005',
      nickname: 'nickEx05',
      status: 'activated',
      type: '관리자',
      email: 'emailEx05@gmail.com',
      createdDate: '2022-10-09 00:12',
      connectedDate: '2022-10-12 00:12',
    },
    {
      id: '0006',
      nickname: 'nickEx06',
      status: 'activated',
      type: '일반',
      email: 'emailEx06@gmail.com',
      createdDate: '2022-10-09 00:12',
      connectedDate: '2022-10-12 00:12',
    },
    {
      id: '0007',
      nickname: 'nickEx07',
      status: 'activated',
      type: '관리자',
      email: 'emailEx07@gmail.com',
      createdDate: '2022-10-09 00:12',
      connectedDate: '2022-10-12 00:12',
    },
    {
      id: '0008',
      nickname: 'nickEx08',
      status: 'activated',
      type: '일반',
      email: 'emailEx08@gmail.com',
      createdDate: '2022-10-09 00:12',
      connectedDate: '2022-10-12 00:12',
    },
    {
      id: '0009',
      nickname: 'nickEx09',
      status: 'activated',
      type: '일반',
      email: 'emailEx09@gmail.com',
      createdDate: '2022-10-09 00:12',
      connectedDate: '2022-10-12 00:12',
    },
    {
      id: '0010',
      nickname: 'nickEx10',
      status: 'activated',
      type: '관리자',
      email: 'emailEx10@gmail.com',
      createdDate: '2022-10-09 00:12',
      connectedDate: '2022-10-12 00:12',
    },
  ],
  membersLength: 10,
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {

  },
});

export default membersSlice;