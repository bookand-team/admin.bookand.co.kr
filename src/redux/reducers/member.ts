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
    setMember: (state, action) => {
      state.member = action.payload.member;
    },
    setMembers: (state, action) => {
      state.members = action.payload.members;
      state.membersLength = action.payload.membersLength;
    }
  }
});

export const { setMember, setMembers } = memberSlice.actions;

export default memberSlice;