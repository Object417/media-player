import { configureStore } from "@reduxjs/toolkit"

import appTabsSlice from "Store/slices/appTabsSlice"
import audioSlice from "Store/slices/audioSlice"

const store = configureStore({
  reducer: {
    audio: audioSlice,
    tabs: appTabsSlice
  }
})

export default store
