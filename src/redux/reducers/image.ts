import { createSlice } from '@reduxjs/toolkit';

import { createImageUrl } from '../actions/image';

export type ImageState = {
  imageUrl: string | null;

  createImageUrlLoading: boolean;
  createImageUrlDone: any;
  createImageUrlError: any;
};

const initialState: ImageState = {
  imageUrl: null,

  createImageUrlLoading: false,
  createImageUrlDone: null,
  createImageUrlError: null
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    // 이미지 url 생성하기
    builder.addCase(createImageUrl.pending, (state) => {
      state.createImageUrlLoading = true;
      state.createImageUrlDone = null;
      state.createImageUrlError = null;
    });
    builder.addCase(createImageUrl.fulfilled, (state, action) => {
      state.createImageUrlLoading = false;
      state.createImageUrlDone = action.payload.message ? action.payload.message : true;
      state.imageUrl = action.payload.imageUrl;
    });
    builder.addCase(createImageUrl.rejected, (state, action) => {
      state.createImageUrlLoading = false;
      state.createImageUrlError = action.payload.message ? action.payload.message : true;
    });
  }
});

export default imageSlice;