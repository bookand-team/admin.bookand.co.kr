import { createSlice } from '@reduxjs/toolkit';

import { ArticleState } from '@types';

const initialState: ArticleState = {
  article: null,

  articles: null,
  articlesLength: null
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticle: (state, action) => {
      state.article = action.payload.article;
    },
    setArticles: (state, action) => {
      state.articles = action.payload.articles;
      state.articlesLength = action.payload.articlesLength;
    }
  }
});

export const { setArticle, setArticles } = articleSlice.actions;

export default articleSlice;