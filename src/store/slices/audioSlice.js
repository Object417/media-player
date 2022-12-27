import { createSlice } from "@reduxjs/toolkit"
import { list } from "postcss"

const audioSlice = createSlice({
  name: "audio",
  initialState: {
    list: [],
    playingID: null
  },
  reducers: {
    addAudio: (state, { payload }) => {
      state.list.push(payload)
    },
    removeAudio: (state, { payload }) => {
      state.list = state.list.filter((audio) => audio.id !== payload)
    }
  }
})

export const { addAudio, removeAudio } = audioSlice.actions
export default audioSlice.reducer
