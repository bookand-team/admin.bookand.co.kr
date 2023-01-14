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

  }
});

export default pushSlice;