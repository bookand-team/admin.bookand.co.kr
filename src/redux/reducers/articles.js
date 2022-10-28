import { createSlice } from '@reduxjs/toolkit';

import { dummyArticles } from '../../hooks/dummy_data';
import { deleteArticles, loadArticles } from '../actions/articles';

const initialState = {
  articles: null,
  articlesLength: null,

  loadArticlesLoading: null,
  loadArticlesDone: null,
  loadArticlesError: null,

  deleteArticlesLoading: null,
  deleteArticlesDone: null,
  deleteArticlesError: null,
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
  extraReducers: (builder) => {
    // articles 불러오기
    builder.addCase(loadArticles.pending, (state) => {
      state.loadArticlesLoading = true;
      state.loadArticlesDone = null;
      state.loadArticlesError = null;
    })
    builder.addCase(loadArticles.fulfilled, (state, action) => {
      state.loadArticlesLoading = false;
      state.loadArticlesDone = action.payload.message ? action.payload.message : true;
      state.articles = action.payload.articles;
      state.articlesLength = action.payload.articlesLength;
    })
    builder.addCase(loadArticles.rejected, (state, action) => {
      state.loadArticlesLoading = false;
      state.loadArticlesError = action.payload.message ? action.payload.message : true;
    })
    // articles 삭제하기
    builder.addCase(deleteArticles.pending, (state) => {
      state.deleteArticlesLoading = true;
      state.deleteArticlesDone = null;
      state.deleteArticlesError = null;
    })
    builder.addCase(deleteArticles.fulfilled, (state, action) => {
      state.deleteArticlesLoading = false;
      state.deleteArticlesDone = action.payload.message ? action.payload.message : true;
    })
    builder.addCase(deleteArticles.rejected, (state, action) => {
      state.deleteArticlesLoading = false;
      state.deleteArticlesError = action.payload.message ? action.payload.message : true;
    })
  }
});

export const { loadDummyArticles } = articlesSlice.actions;

export default articlesSlice;