import React from "react"

import { useSelector } from "react-redux"
import {
  displayCurrentTimeSelector,
  playingAudioSelector
} from "Store/slices/audioSlice"

import { Stack, Typography } from "@mui/material"

import getFormattedTime from "Components/getFormattedTime"
import AudioSlider from "./AudioSlider"

function AudioTimeBar() {
  const displayCurrentTime = useSelector(displayCurrentTimeSelector)
  const playingAudio = useSelector(playingAudioSelector)

  return (
    <Stack direction="row" spacing={2} alignItems="center" sx={{ px: 2 }}>
      <Typography>{getFormattedTime(displayCurrentTime)}</Typography>
      <AudioSlider />
      <Typography>{getFormattedTime(playingAudio?.duration || 0)}</Typography>
    </Stack>
  )
}

export default AudioTimeBar
