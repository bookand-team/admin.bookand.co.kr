import { createSlice } from '@reduxjs/toolkit';

import { dummyArticles } from '@assets/dummy';
import { createArticle, readArticle, updateArticle, deleteArticle } from '@redux/actions/article';
import { ArticleState } from '@types';

const initialState: ArticleState = {
  article: null,

  createArticleLoading: false,
  createArticleDone: null,
  createArticleError: null,

  readArticleLoading: false,
  readArticleDone: null,
  readArticleError: null,

  updateArticleLoading: false,
  updateArticleDone: null,
  updateArticleError: null,

  deleteArticleLoading: false,
  deleteArticleDone: null,
  deleteArticleError: null
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    loadDummyArticle: (state, action) => {
      state.article = dummyArticles[action.payload - 1];
    }
  },
  extraReducers: (builder) => {
    // 아티클 생성하기
    builder.addCase(createArticle.pending, (state) => {
      state.createArticleLoading = true;
      state.createArticleDone = null;
      state.createArticleError = null;
    });
    builder.addCase(createArticle.fulfilled, (state, action) => {
      state.createArticleLoading = false;
      state.createArticleDone = action.payload.id ? action.payload.id : true;
    });
    builder.addCase(createArticle.rejected, (state, action) => {
      state.createArticleLoading = false;
      state.createArticleError = action.payload.message ? action.payload.message : true;
    });
    // 아티클 조회하기
    builder.addCase(readArticle.pending, (state) => {
      state.readArticleLoading = true;
      state.readArticleDone = null;
      state.readArticleError = null;
    });
    builder.addCase(readArticle.fulfilled, (state, action) => {
      state.readArticleLoading = false;
      state.readArticleDone = action.payload.message ? action.payload.message : true;
      state.article = action.payload.article;
    });
    builder.addCase(readArticle.rejected, (state, action) => {
      state.readArticleLoading = false;
      state.readArticleError = action.payload.message ? action.payload.message : true;
    });
    // 아티클 수정하기
    builder.addCase(updateArticle.pending, (state) => {
      state.updateArticleLoading = true;
      state.updateArticleDone = null;
      state.updateArticleError = null;
    });
    builder.addCase(updateArticle.fulfilled, (state, action) => {
      state.updateArticleLoading = false;
      state.updateArticleDone = action.payload.id ? action.payload.id : true;
    });
    builder.addCase(updateArticle.rejected, (state, action) => {
      state.updateArticleLoading = false;
      state.updateArticleError = action.payload.message ? action.payload.message : true;
    });
    // 아티클 삭제하기
    builder.addCase(deleteArticle.pending, (state) => {
      state.deleteArticleLoading = true;
      state.deleteArticleDone = null;
      state.deleteArticleError = null;
    });
    builder.addCase(deleteArticle.fulfilled, (state, action) => {
      state.deleteArticleLoading = false;
      state.deleteArticleDone = action.payload.message ? action.payload.message : true;
    });
    builder.addCase(deleteArticle.rejected, (state, action) => {
      state.deleteArticleLoading = false;
      state.deleteArticleError = action.payload.message ? action.payload.message : true;
    });
  }
});

export const { loadDummyArticle } = articleSlice.actions;

export default articleSlice;