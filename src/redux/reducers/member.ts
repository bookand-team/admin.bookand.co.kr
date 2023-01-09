import { createSlice } from '@reduxjs/toolkit';

import { readMember, updateMember } from '@redux/actions/member';
import { MemberState } from '@types';

const initialState: MemberState = {
  member: null,

  readMemberLoading: false,
  readMemberDone: null,
  readMemberError: null,

  updateMemberLoading: false,
  updateMemberDone: null,
  updateMemberError: null
};

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    // 멤버 조회하기
    builder.addCase(readMember.pending, (state) => {
      state.readMemberLoading = true;
      state.readMemberDone = null;
      state.readMemberError = null;
    });
    builder.addCase(readMember.fulfilled, (state, action) => {
      state.readMemberLoading = false;
      state.readMemberDone = action.payload;
    });
    builder.addCase(readMember.rejected, (state, action) => {
      state.readMemberLoading = false;
      state.readMemberError = action.payload;
    });
    // 멤버 수정하기
    builder.addCase(updateMember.pending, (state) => {
      state.updateMemberLoading = true;
      state.updateMemberDone = null;
      state.updateMemberError = null;
    });
    builder.addCase(updateMember.fulfilled, (state, action) => {
      state.updateMemberLoading = false;
      state.updateMemberDone = action.payload;
    });
    builder.addCase(updateMember.rejected, (state, action) => {
      state.updateMemberLoading = false;
      state.updateMemberError = action.payload;
    });
  }
});

export default memberSlice;