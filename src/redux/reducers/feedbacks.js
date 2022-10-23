import { createSlice } from '@reduxjs/toolkit';

import { dummyFeedbacks } from '../../hooks/dummy_data';

const initialState = {
  feedbacks: null,
  feedbacksLength: null,
};

const feedbacksSlice = createSlice({
  name: 'feedbacks',
  initialState,
  reducers: {
    loadDummyFeedbacks: (state, action) => {
      state.feedbacks = action.payload.page
        ? dummyFeedbacks.slice((action.payload.page - 1) * 10, action.payload.page * 10)
        : dummyFeedbacks.slice(0, 10);
      state.feedbacksLength = dummyFeedbacks.length;
    },
  },
});

export const { loadDummyFeedbacks } = feedbacksSlice.actions;

export default feedbacksSlice;