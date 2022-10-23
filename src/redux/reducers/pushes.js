import { createSlice } from '@reduxjs/toolkit';

import { dummyPushes } from '../../hooks/dummy_data';

const initialState = {
  pushes: null,
  pushesLength: null,
};

const pushesSlice = createSlice({
  name: 'pushes',
  initialState,
  reducers: {
    loadDummyPushes: (state, action) => {
      state.pushes = action.payload.page
        ? dummyPushes.slice((action.payload.page - 1) * 10, action.payload.page * 10)
        : dummyPushes.slice(0, 10);
      state.pushesLength = dummyPushes.length;
    },
  },
});

export const { loadDummyPushes } = pushesSlice.actions;

export default pushesSlice;