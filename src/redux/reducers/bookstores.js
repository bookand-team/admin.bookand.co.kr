import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookstores: [
    {
      id: '0001',
      title: 'title0001',
      theme: '여행',
      view: 10,
      bookmark: 1,
      status: '노출',
      createdDate: '2022-10-09 00:12',
      exposedDate: '2022-10-12 00:12',
      modifiedDate: '2022-10-12 00:12',
    },
    {
      id: '0002',
      title: 'title0002',
      theme: '음악',
      view: 10,
      bookmark: 1,
      status: '노출',
      createdDate: '2022-10-09 00:12',
      exposedDate: '2022-10-12 00:12',
      modifiedDate: '2022-10-12 00:12',
    },
    {
      id: '0003',
      title: 'title0003',
      theme: '그림',
      view: 10,
      bookmark: 1,
      status: '노출',
      createdDate: '2022-10-09 00:12',
      exposedDate: '2022-10-12 00:12',
      modifiedDate: '2022-10-12 00:12',
    },
    {
      id: '0004',
      title: 'title0004',
      theme: '애완동물',
      view: 10,
      bookmark: 1,
      status: '노출',
      createdDate: '2022-10-09 00:12',
      exposedDate: '2022-10-12 00:12',
      modifiedDate: '2022-10-12 00:12',
    },
    // {
    //   id: '0005',
    //   title: 'title0005',
    //   theme: '영화',
    //   view: 10,
    //   bookmark: 1,
    //   status: '노출',
    //   createdDate: '2022-10-09 00:12',
    //   exposedDate: '2022-10-12 00:12',
    //   modifiedDate: '2022-10-12 00:12',
    // },
  ],
  bookstoresLength: 4,
};

const bookstoresSlice = createSlice({
  name: 'bookstores',
  initialState,
  reducers: {

  },
});

export default bookstoresSlice;