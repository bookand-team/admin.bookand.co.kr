import { createSlice } from '@reduxjs/toolkit';

import { dummyMembers } from '../../hooks/dummy_data';

const initialState = {
  members: null,
  membersLength: null,
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
    },
  },
});

export const { loadDummyMembers } = membersSlice.actions;

export default membersSlice;