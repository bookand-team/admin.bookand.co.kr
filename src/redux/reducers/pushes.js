import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pushes: [
    {
      id: '0001',
      category: '업데이트',
      title: 'titleEx01',
      status: '전송완료',
      createdDate: '2022-10-09 00:12',
      sentDate: '2022-10-09 00:12',
    },
    {
      id: '0002',
      category: '에러',
      title: 'titleEx02',
      status: '전송실패',
      createdDate: '2022-10-09 00:12',
      sentDate: '2022-10-09 00:12',
    },
    {
      id: '0003',
      category: '홍보',
      title: 'titleEx03',
      status: '전송전',
      createdDate: '2022-10-09 00:12',
      sentDate: '2022-10-09 00:12',
    },
    {
      id: '0004',
      category: '기타',
      title: 'titleEx04',
      status: '전송완료',
      createdDate: '2022-10-09 00:12',
      sentDate: '2022-10-09 00:12',
    },
  ],
  pushesLength: 4,
};

const pushesSlice = createSlice({
  name: 'pushes',
  initialState,
  reducers: {

  },
});

export default pushesSlice;