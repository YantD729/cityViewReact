import { createSlice, current } from '@reduxjs/toolkit';

const imageSlice = createSlice({
  name: 'image',
  initialState: { images: [] },
  reducers: {
    addImage: (state, action) => {
      state.images.push(action.payload);
    },
    removeImage: (state, action) => {
        state.images = state.images.filter((image, index) => index !== action.payload);
    },
  },
});

export const { addImage, removeImage } = imageSlice.actions;
export default imageSlice.reducer;
