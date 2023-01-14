import { createSlice } from '@reduxjs/toolkit';

import { MemberState } from '@types';

const initialState: MemberState = {
  member: null,

  members: null,
  membersLength: null
};

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {

  }
});

export default memberSlice;