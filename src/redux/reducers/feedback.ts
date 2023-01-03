import { createSlice } from '@reduxjs/toolkit';

import { readFeedback } from '../actions/feedback';

export type FeedbackState = {
  feedback: any;

  readFeedbackLoading: boolean;
  readFeedbackDone: any;
  readFeedbackError: any;
};

const initialState: FeedbackState = {
  feedback: null,

  readFeedbackLoading: false,
  readFeedbackDone: null,
  readFeedbackError: null
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    // 피드백 조회하기
    builder.addCase(readFeedback.pending, (state) => {
      state.readFeedbackLoading = true;
      state.readFeedbackDone = null;
      state.readFeedbackError = null;
    });
    builder.addCase(readFeedback.fulfilled, (state, action) => {
      state.readFeedbackLoading = false;
      state.readFeedbackDone = action.payload.message ? action.payload.message : true;
      state.feedback = action.payload.feedback;
    });
    builder.addCase(readFeedback.rejected, (state, action) => {
      state.readFeedbackLoading = false;
      state.readFeedbackError = action.payload.message ? action.payload.message : true;
    });
  }
});

export default feedbackSlice;