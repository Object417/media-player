import { createSlice } from "@reduxjs/toolkit"
import { addAudio } from "Store/thunks/audioThunks"

const audioSlice = createSlice({
  name: "audio",
  initialState: {
    list: [],
    playing: { id: null, isPlaying: false },
    status: "idle"
  },
  reducers: {
    // typeof payload === "number" (audioID)
    deleteAudio: (state, { payload }) => {
      state.list = state.list.filter((audio) => audio.id !== payload)
    },
    // payload is audio ID
    setPlayingID: (state, { payload }) => {
      state.playing.id = payload
    },
    // payload is a boolean
    setIsPlaying: (state, { payload }) => {
      state.playing.isPlaying = payload
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
  state.audio.list.find((audio) => audio.id === state.audio.playing.id)
export const isPlayingSelector = (state) => state.audio.playing.isPlaying
export const audioListSelector = (state) => state.audio.list

export const { deleteAudio, setPlayingID, setIsPlaying } = audioSlice.actions
export default audioSlice.reducer
