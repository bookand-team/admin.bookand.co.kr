import { createSlice } from '@reduxjs/toolkit';

import { dummyArticles } from '../../hooks/dummy_data';

const initialState = {
  articles: null,
  articlesLength: null,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    loadDummyArticles: (state, action) => {
      state.articles = action.payload.page
        ? dummyArticles.slice((action.payload.page - 1) * action.payload.row, action.payload.page * action.payload.row)
        : dummyArticles.slice(0, 5);
      state.articlesLength = dummyArticles.length;
    },
  },
});

export const { loadDummyArticles } = articlesSlice.actions;

export default articlesSlice;