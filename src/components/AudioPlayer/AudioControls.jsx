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
import {
  currentTimeSelector,
  displayCurrentTimeSelector,
  setCurrentTime,
  setDisplayCurrentTime
} from "Store/slices/audioSlice"

function AudioControls() {
  const dispatch = useDispatch()

  const playingAudio = useSelector(playingAudioSelector)
  const isPlaying = useSelector(isPlayingSelector)
  const currentTime = useSelector(currentTimeSelector)
  const displayCurrentTime = useSelector(displayCurrentTimeSelector)

  function handlePlayPause() {
    dispatch(setIsPlaying(!isPlaying))
  }
  function handleReplay5() {
    // const newCurrentTime = displayCurrentTime >= 5 ? displayCurrentTime - 5 : 0
    const newCurrentTime = displayCurrentTime - 5

    dispatch(setCurrentTime(newCurrentTime))
    dispatch(setDisplayCurrentTime(newCurrentTime))
  }
  function handleForward5() {
    // const newCurrentTime =
    // displayCurrentTime <= playingAudio.duration - 5
    // ? displayCurrentTime + 5
    // : Math.floor(playingAudio.duration)

    const newCurrentTime = displayCurrentTime + 5

    dispatch(setCurrentTime(newCurrentTime))
    dispatch(setDisplayCurrentTime(newCurrentTime))
  }

  return (
    <ButtonGroup style={{ width: "100%", justifyContent: "center" }}>
      <IconButton disabled={!playingAudio}>
        <SkipPrevious />
      </IconButton>
      <IconButton disabled={!playingAudio} onClick={handleReplay5}>
        <Replay5 />
      </IconButton>
      <IconButton disabled={!playingAudio} onClick={handlePlayPause}>
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <IconButton disabled={!playingAudio} onClick={handleForward5}>
        <Forward5 />
      </IconButton>
      <IconButton disabled={!playingAudio}>
        <SkipNext />
      </IconButton>
    </ButtonGroup>
  )
}

export default AudioControls
