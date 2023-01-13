import { createSlice } from "@reduxjs/toolkit"
import { addAudio } from "Store/thunks/audioThunks"

const audioSlice = createSlice({
  name: "audio",
  initialState: {
    list: [],
    // FIXME: Fix this shit
    playing: {
      id: null,
      isPlaying: false,
      // Why do I need 2 variables to track the current time?
      // Well, I don't wanna get into infinity loop caused by updating the
      // current time which is linked to the <audio> element
      currentTime: 0, // Updates withing interaction
      displayCurrentTime: 0 // Updates every frame
    },
    status: "idle"
  },
  reducers: {
    // typeof payload === "number" (audioID)
    deleteAudio: (state, { payload }) => {
      state.list = state.list.filter((audio) => audio.id !== payload)

      //FIXME: Side logic in a reducer
      if (state.playing.id === payload) {
        state.playing = {
          id: null,
          isPlaying: false,
          currentTime: 0,
          displayCurrentTime: 0
        }
      }
    },
    // payload is audio ID
    setPlayingID: (state, { payload }) => {
      state.playing.id = payload
    },
    // payload is a boolean
    setIsPlaying: (state, { payload }) => {
      state.playing.isPlaying = payload
    },
    // payload is a float
    setCurrentTime: (state, { payload }) => {
      state.playing.currentTime = payload
    },
    setDisplayCurrentTime(state, { payload }) {
      state.playing.displayCurrentTime = payload
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

// FIXME: Fix this shit
export const playingAudioSelector = (state) =>
  state.audio.list.find((audio) => audio.id === state.audio.playing.id)
export const isPlayingSelector = (state) => state.audio.playing.isPlaying
export const currentTimeSelector = (state) => state.audio.playing.currentTime
export const displayCurrentTimeSelector = (state) =>
  state.audio.playing.displayCurrentTime

export const audioListSelector = (state) => state.audio.list

export const {
  deleteAudio,
  setPlayingID,
  setIsPlaying,
  setCurrentTime,
  setDisplayCurrentTime
} = audioSlice.actions
export default audioSlice.reducer
