import { createSlice } from '@reduxjs/toolkit';

import { dummyArticles } from '@assets/dummy';
import { readArticles, deleteArticles } from '@redux/actions/articles';
import { ArticlesState } from '@types';

const initialState: ArticlesState = {
  articles: null,
  articlesLength: null,

  readArticlesLoading: false,
  readArticlesDone: null,
  readArticlesError: null,

  deleteArticlesLoading: false,
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
      state.readArticlesDone = action.payload;
    });
    builder.addCase(readArticles.rejected, (state, action) => {
      state.readArticlesLoading = false;
      state.readArticlesError = action.payload;
    });
    // 여러 아티클 삭제하기
    builder.addCase(deleteArticles.pending, (state) => {
      state.deleteArticlesLoading = true;
      state.deleteArticlesDone = null;
      state.deleteArticlesError = null;
    });
    builder.addCase(deleteArticles.fulfilled, (state, action) => {
      state.deleteArticlesLoading = false;
      state.deleteArticlesDone = action.payload;
    });
    builder.addCase(deleteArticles.rejected, (state, action) => {
      state.deleteArticlesLoading = false;
      state.deleteArticlesError = action.payload;
    });
  }
});

export const { loadDummyArticles } = articlesSlice.actions;

export default articlesSlice;