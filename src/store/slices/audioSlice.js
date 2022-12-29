import { createSlice } from "@reduxjs/toolkit"
import { addAudio } from "Store/thunks/audioThunks"

const audioSlice = createSlice({
  name: "audio",
  initialState: {
    list: [],
    playingID: null,
    isPlaying: false,
    status: "idle"
  },
  reducers: {
    // typeof payload === "array"
    // addAudio: (state, { payload }) => {
    // state.list = state.list.concat(payload)
    // },
    // typeof payload === "number" (audioID)
    deleteAudio: (state, { payload }) => {
      state.list = state.list.filter((audio) => audio.id !== payload)
    },
    // payload is audio ID
    setPlayingID: (state, { payload }) => {
      state.playingID = payload
    },
    setIsPlaying: (state, { payload }) => {
      state.isPlaying = payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAudio.pending, (state, action) => {
        state.status = "pending"
      })
      // typeof payload === "array"
      .addCase(addAudio.fulfilled, (state, action) => {
        state.status = "fulfilled"
        state.list = state.list.concat(action.payload)
      })
      .addCase(addAudio.rejected, (state, action) => {
        state.status = "rejected"
        console.warn(action)
      })
  }
})

export const playingAudioSelector = (state) =>
  state.audio.list.find((audio) => audio.id === state.audio.playingID)
export const isPlayingSelector = (state) => state.audio.isPlaying
export const audioListSelector = (state) => state.audio.list

export const { deleteAudio, setPlayingID, setIsPlaying } = audioSlice.actions
export default audioSlice.reducer
