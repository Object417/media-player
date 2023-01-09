import { configureStore } from "@reduxjs/toolkit"

import audioSlice from "Store/slices/audioSlice"

const store = configureStore({
  reducer: {
    audio: audioSlice
  }
})

export default store
