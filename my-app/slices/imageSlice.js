import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
  name: 'image',
  initialState: { images: [] },
  reducers: {
    addImage: (state, action) => {
      state.images.push(action.payload)
    },
    removeImage: (state, action) => {
        state.images = state.images.filter((image, index) => index !== action.payload)
    },
    resetImages: (state, action) => {
      state.images = []
    },
  },
});

export const { addImage, removeImage, resetImages } = imageSlice.actions;
export default imageSlice.reducer;
