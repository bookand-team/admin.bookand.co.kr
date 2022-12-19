import { createSlice } from '@reduxjs/toolkit';

import { dummyArticles } from '../../dummy_data';
import { readArticles, deleteArticles } from '../actions/articles';

const initialState = {
  articles: null,
  articlesLength: null,

  readArticlesLoading: null,
  readArticlesDone: null,
  readArticlesError: null,

  deleteArticlesLoading: null,
  deleteArticlesDone: null,
  deleteArticlesError: null
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    loadDummyArticles: (state, action) => {
      state.articles = action.payload.page
        ? dummyArticles.slice((action.payload.page - 1) * action.payload.row, action.payload.page * action.payload.row)
        : dummyArticles.slice(0, 10);
      state.articlesLength = dummyArticles.length;
    }
  },
  extraReducers: (builder) => {
    // 여러 아티클 조회하기
    builder.addCase(readArticles.pending, (state) => {
      state.readArticlesLoading = true;
      state.readArticlesDone = null;
      state.readArticlesError = null;
    });
    builder.addCase(readArticles.fulfilled, (state, action) => {
      state.readArticlesLoading = false;
      state.readArticlesDone = action.payload.message ? action.payload.message : true;
      state.articles = action.payload.articles;
      state.articlesLength = action.payload.articles_length;
    });
    builder.addCase(readArticles.rejected, (state, action) => {
      state.readArticlesLoading = false;
      state.readArticlesError = action.payload.message ? action.payload.message : true;
    });
    // 여러 아티클 삭제하기
    builder.addCase(deleteArticles.pending, (state) => {
      state.deleteArticlesLoading = true;
      state.deleteArticlesDone = null;
      state.deleteArticlesError = null;
    });
    builder.addCase(deleteArticles.fulfilled, (state, action) => {
      state.deleteArticlesLoading = false;
      state.deleteArticlesDone = action.payload.message ? action.payload.message : true;
    });
    builder.addCase(deleteArticles.rejected, (state, action) => {
      state.deleteArticlesLoading = false;
      state.deleteArticlesError = action.payload.message ? action.payload.message : true;
    });
  }
});

export const { loadDummyArticles } = articlesSlice.actions;

export default articlesSlice;