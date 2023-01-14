import { createSlice } from '@reduxjs/toolkit';

import { PushState } from '@types';

const initialState: PushState = {
  push: null,

  pushes: null,
  pushesLength: null
};

const pushSlice = createSlice({
  name: 'push',
  initialState,
  reducers: {
    setPush: (state, action) => {
      state.push = action.payload.push;
    },
    setPushes: (state, action) => {
      state.pushes = action.payload.pushes;
      state.pushesLength = action.payload.pushesLength;
    }
  }
});

export const { setPush, setPushes } = pushSlice.actions;

export default pushSlice;