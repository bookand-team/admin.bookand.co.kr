import { createSlice } from '@reduxjs/toolkit';

import { FeedbackState } from '@types';

const initialState: FeedbackState = {
  feedback: null,

  feedbacks: null,
  feedbacksLength: null
};

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    setFeedback: (state, action) => {
      state.feedback = action.payload.feedback;
    },
    setFeedbacks: (state, action) => {
      state.feedbacks = action.payload.feedbacks;
      state.feedbacksLength = action.payload.feedbacksLength;
    }
  }
});

export const { setFeedback, setFeedbacks } = feedbackSlice.actions;

export default feedbackSlice;