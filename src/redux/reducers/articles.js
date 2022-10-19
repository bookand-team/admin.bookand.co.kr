import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  articles: [
    {
      id: '0001',
      title: 'title0001',
      category: '서점소개',
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
      category: '서점소개',
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
      category: '서점소개',
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
      category: '서점소개',
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
    //   category: '서점소개',
    //   view: 10,
    //   bookmark: 1,
    //   status: '노출',
    //   createdDate: '2022-10-09 00:12',
    //   exposedDate: '2022-10-12 00:12',
    //   modifiedDate: '2022-10-12 00:12',
    // },
  ],
  articlesLength: 4,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {

  },
});

export default articlesSlice;