import { configureStore } from "@reduxjs/toolkit"
import imageReducer from "../slices/imageSlice.js"

export function makeStore() {
  return configureStore({
    reducer: {
      image: imageReducer,  
    },
  })
}

export const store = makeStore()
