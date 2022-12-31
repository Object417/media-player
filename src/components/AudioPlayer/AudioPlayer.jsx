import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  playingAudioSelector,
  isPlayingSelector,
  setIsPlaying,
  currentTimeSelector,
  setCurrentTime,
  displayCurrentTimeSelector,
  setDisplayCurrentTime,
  isSlidingSelector,
  setIsSliding
} from "Store/slices/audioSlice"

import {
  Alert,
  ButtonGroup,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Slider,
  Stack,
  Typography
} from "@mui/material"
import {
  Forward5,
  Pause,
  PlayArrow,
  Replay5,
  SkipNext,
  SkipPrevious
} from "@mui/icons-material"

import noImg from "Assets/imgs/no-img.webp"

function AudioPlayer() {
  const dispatch = useDispatch()

  const playingAudio = useSelector(playingAudioSelector)
  const isPlaying = useSelector(isPlayingSelector)
  const isSliding = useSelector(isSlidingSelector)
  const currentTime = useSelector(currentTimeSelector)
  const displayCurrentTime = useSelector(displayCurrentTimeSelector)

  function handlePlayPause() {
    dispatch(setIsPlaying(!isPlaying))
  }

  function handleTimeChange(e, newValue) {
    dispatch(setIsSliding(false))
    dispatch(setCurrentTime(newValue))
  }

  function handleTimeSearch(e, newValue) {
    dispatch(setIsSliding(true))
    dispatch(setDisplayCurrentTime(newValue))
  }

  if (!playingAudio) {
    return <Alert severity="warning">No audio is playing now</Alert>
  }

  return (
    <>
      <CardMedia component="img" image={playingAudio.cover || noImg} />
      <CardContent>
        <Typography variant="h5" component="h5">
          {playingAudio.title}
        </Typography>
        <Typography variant="subtitle1" component="h6">
          {`${playingAudio.artists.join(", ")} — ${playingAudio.album}`}
        </Typography>
      </CardContent>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ px: 2 }}>
        <Typography>{parseInt(displayCurrentTime)}</Typography>
        <Slider
          value={displayCurrentTime}
          onChange={handleTimeSearch}
          onChangeCommitted={handleTimeChange}
          min={0}
          max={playingAudio.duration}
          valueLabelDisplay="auto"
        />
        <Typography>{parseInt(playingAudio.duration)}</Typography>
      </Stack>
      <CardActions>
        <ButtonGroup style={{ width: "100%", justifyContent: "center" }}>
          <IconButton>
            <SkipPrevious />
          </IconButton>
          <IconButton>
            <Replay5 />
          </IconButton>
          <IconButton onClick={handlePlayPause}>
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
          <IconButton>
            <Forward5 />
          </IconButton>
          <IconButton>
            <SkipNext />
          </IconButton>
        </ButtonGroup>
      </CardActions>
    </>
  )
}

export default AudioPlayer
