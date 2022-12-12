import { createSlice } from '@reduxjs/toolkit';

import { readMember, updateMember } from '../actions/member';

const initialState = {
  member: null,

  readMemberLoading: null,
  readMemberDone: null,
  readMemberError: null,

  updateMemberLoading: null,
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
      state.readMemberDone = action.payload.message ? action.payload.message : true;
      state.member = action.payload.member;
    });
    builder.addCase(readMember.rejected, (state, action) => {
      state.readMemberLoading = false;
      state.readMemberError = action.payload.message ? action.payload.message : true;
    });
    // 멤버 수정하기
    builder.addCase(updateMember.pending, (state) => {
      state.updateMemberLoading = true;
      state.updateMemberDone = null;
      state.updateMemberError = null;
    });
    builder.addCase(updateMember.fulfilled, (state, action) => {
      state.updateMemberLoading = false;
      state.updateMemberDone = action.payload.id ? action.payload.id : true;
    });
    builder.addCase(updateMember.rejected, (state, action) => {
      state.updateMemberLoading = false;
      state.updateMemberError = action.payload.message ? action.payload.message : true;
    });
  }
});

export default memberSlice;