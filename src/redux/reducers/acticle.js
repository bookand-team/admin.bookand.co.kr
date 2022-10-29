import { createSlice } from '@reduxjs/toolkit';

import { postArticle } from '../actions/article';

const initialState = {
  article: null,

  postArticleLoading: null,
  postArticleDone: null,
  postArticleError: null,
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    // article 생성하기
    builder.addCase(postArticle.pending, (state) => {
      state.postArticleLoading = true;
      state.postArticleDone = null;
      state.postArticleError = null;
    })
    builder.addCase(postArticle.fulfilled, (state, action) => {
      state.postArticleLoading = false;
      state.postArticleDone = action.payload.message ? action.payload.message : true;
      state.article = action.payload.article;
    })
    builder.addCase(postArticle.rejected, (state, action) => {
      state.postArticleLoading = false;
      state.postArticleError = action.payload.message ? action.payload.message : true;
    })
  }
});

export default articleSlice;