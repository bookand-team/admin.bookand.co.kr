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

  }
});

export default feedbackSlice;