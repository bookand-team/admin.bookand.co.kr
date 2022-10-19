import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  feedbacks: [
    {
      id: '0001',
      email: 'emailEx01@gmail.com',
      content: '서점 미등록 불만입니다.',
      device: 'Android',
      feedbackNumber: 3,
      type: '정보누락',
      createdDate: '2022-10-09 00:12',
    },
    {
      id: '0002',
      email: 'emailEx02@gmail.com',
      content: '앱 업데이트 이후 접속불량 ...',
      device: 'IOS',
      feedbackNumber: 1,
      type: '업데이트',
      createdDate: '2022-10-09 00:12',
    },
  ],
  feedbacksLength: 2,
};

const feedbacksSlice = createSlice({
  name: 'feedbacks',
  initialState,
  reducers: {

  },
});

export default feedbacksSlice;