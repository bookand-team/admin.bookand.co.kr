import { createSlice } from '@reduxjs/toolkit';

import { dummyFeedbacks } from '../../hooks/dummy_data';
import { readFeedbacks, deleteFeedbacks } from '../actions/feedbacks';

const initialState = {
  feedbacks: null,
  feedbacksLength: null,

  readFeedbacksLoading: null,
  readFeedbacksDone: null,
  readFeedbacksError: null,

  deleteFeedbacksLoading: null,
  deleteFeedbacksDone: null,
  deleteFeedbacksError: null,
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
  extraReducers: (builder) => {
    // 여러 피드백 조회하기
    builder.addCase(readFeedbacks.pending, (state) => {
      state.readFeedbacksLoading = true;
      state.readFeedbacksDone = null;
      state.readFeedbacksError = null;
    })
    builder.addCase(readFeedbacks.fulfilled, (state, action) => {
      state.readFeedbacksLoading = false;
      state.readFeedbacksDone = action.payload.message ? action.payload.message : true;
      state.feedbacks = action.payload.feedbacks;
      state.feedbacksLength = action.payload.feedbacks_length;
    })
    builder.addCase(readFeedbacks.rejected, (state, action) => {
      state.readFeedbacksLoading = false;
      state.readFeedbacksError = action.payload.message ? action.payload.message : true;
    })
    // 여러 피드백 삭제하기
    builder.addCase(deleteFeedbacks.pending, (state) => {
      state.deleteFeedbacksLoading = true;
      state.deleteFeedbacksDone = null;
      state.deleteFeedbacksError = null;
    })
    builder.addCase(deleteFeedbacks.fulfilled, (state, action) => {
      state.deleteFeedbacksLoading = false;
      state.deleteFeedbacksDone = action.payload.message ? action.payload.message : true;
    })
    builder.addCase(deleteFeedbacks.rejected, (state, action) => {
      state.deleteFeedbacksLoading = false;
      state.deleteFeedbacksError = action.payload.message ? action.payload.message : true;
    })
  }
});

export const { loadDummyFeedbacks } = feedbacksSlice.actions;

export default feedbacksSlice;