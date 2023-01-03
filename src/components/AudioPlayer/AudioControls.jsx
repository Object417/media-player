import React from "react"

import { useDispatch, useSelector } from "react-redux"
import {
  isPlayingSelector,
  setIsPlaying,
  playingAudioSelector
} from "Store/slices/audioSlice"

import { ButtonGroup, IconButton } from "@mui/material"
import {
  SkipPrevious,
  SkipNext,
  Replay5,
  Forward5,
  Pause,
  PlayArrow
} from "@mui/icons-material"

function AudioControls() {
  const playingAudio = useSelector(playingAudioSelector)
  const isPlaying = useSelector(isPlayingSelector)
  const dispatch = useDispatch()

  function handlePlayPause() {
    dispatch(setIsPlaying(!isPlaying))
  }

  return (
    <ButtonGroup style={{ width: "100%", justifyContent: "center" }}>
      <IconButton disabled={!playingAudio}>
        <SkipPrevious />
      </IconButton>
      <IconButton disabled={!playingAudio}>
        <Replay5 />
      </IconButton>
      <IconButton disabled={!playingAudio} onClick={handlePlayPause}>
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <IconButton disabled={!playingAudio}>
        <Forward5 />
      </IconButton>
      <IconButton disabled={!playingAudio}>
        <SkipNext />
      </IconButton>
    </ButtonGroup>
  )
}

export default AudioControls
