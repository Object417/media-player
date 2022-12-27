import { configureStore } from "@reduxjs/toolkit"
import audioSlice from "./slices/audioSlice"

const store = configureStore({
  reducer: {
    audio: audioSlice
  }
})

export const audioSelector = (state) => state.audio
export default store
