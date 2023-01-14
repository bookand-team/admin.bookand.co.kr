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

  }
});

export default articleSlice;