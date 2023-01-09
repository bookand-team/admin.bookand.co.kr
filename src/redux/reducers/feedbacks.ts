import { createSlice } from '@reduxjs/toolkit';

import { dummyFeedbacks } from '@assets/dummy';
import { readFeedbacks, deleteFeedbacks } from '@redux/actions/feedbacks';
import { FeedbacksState } from '@types';

const initialState: FeedbacksState = {
  feedbacks: null,
  feedbacksLength: null,

  readFeedbacksLoading: false,
  readFeedbacksDone: null,
  readFeedbacksError: null,

  deleteFeedbacksLoading: false,
  deleteFeedbacksDone: null,
  deleteFeedbacksError: null
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
    }
  },
  extraReducers: (builder) => {
    // 여러 피드백 조회하기
    builder.addCase(readFeedbacks.pending, (state) => {
      state.readFeedbacksLoading = true;
      state.readFeedbacksDone = null;
      state.readFeedbacksError = null;
    });
    builder.addCase(readFeedbacks.fulfilled, (state, action) => {
      state.readFeedbacksLoading = false;
      state.readFeedbacksDone = action.payload;
    });
    builder.addCase(readFeedbacks.rejected, (state, action) => {
      state.readFeedbacksLoading = false;
      state.readFeedbacksError = action.payload;
    });
    // 여러 피드백 삭제하기
    builder.addCase(deleteFeedbacks.pending, (state) => {
      state.deleteFeedbacksLoading = true;
      state.deleteFeedbacksDone = null;
      state.deleteFeedbacksError = null;
    });
    builder.addCase(deleteFeedbacks.fulfilled, (state, action) => {
      state.deleteFeedbacksLoading = false;
      state.deleteFeedbacksDone = action.payload;
    });
    builder.addCase(deleteFeedbacks.rejected, (state, action) => {
      state.deleteFeedbacksLoading = false;
      state.deleteFeedbacksError = action.payload;
    });
  }
});

export const { loadDummyFeedbacks } = feedbacksSlice.actions;

export default feedbacksSlice;