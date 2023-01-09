import { createSlice } from '@reduxjs/toolkit';

import { readFeedback } from '@redux/actions/feedback';
import { FeedbackState } from '@types';

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
      state.readFeedbackDone = action.payload;
    });
    builder.addCase(readFeedback.rejected, (state, action) => {
      state.readFeedbackLoading = false;
      state.readFeedbackError = action.payload;
    });
  }
});

export default feedbackSlice;