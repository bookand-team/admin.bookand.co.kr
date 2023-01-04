import { createSlice } from '@reduxjs/toolkit';

import { dummyMembers } from '../../dummy_data';
import { readMembers } from '../actions/members';

import type { MembersState } from 'src/types';

const initialState: MembersState = {
  members: null,
  membersLength: null,

  readMembersLoading: false,
  readMembersDone: null,
  readMembersError: null
};

const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {
    loadDummyMembers: (state, action) => {
      state.members = action.payload.page
        ? dummyMembers.slice((action.payload.page - 1) * 10, action.payload.page * 10)
        : dummyMembers.slice(0, 10);
      state.membersLength = dummyMembers.length;
    }
  },
  extraReducers: (builder) => {
    // 여러 멤버 조회하기
    builder.addCase(readMembers.pending, (state) => {
      state.readMembersLoading = true;
      state.readMembersDone = null;
      state.readMembersError = null;
    });
    builder.addCase(readMembers.fulfilled, (state, action) => {
      state.readMembersLoading = false;
      state.readMembersDone = action.payload.message ? action.payload.message : true;
      state.members = action.payload.members;
      state.membersLength = action.payload.members_length;
    });
    builder.addCase(readMembers.rejected, (state, action) => {
      state.readMembersLoading = false;
      state.readMembersError = action.payload.message ? action.payload.message : true;
    });
  }
});

export const { loadDummyMembers } = membersSlice.actions;

export default membersSlice;