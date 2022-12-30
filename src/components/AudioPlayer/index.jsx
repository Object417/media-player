import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { addAudio } from "Store/thunks/audioThunks"
import {
  playingAudioSelector,
  isPlayingSelector,
  setIsPlaying
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
// import defaultAudio from "Assets/audios/38 - Sweet Darkness.mp3"

function AudioPlayer() {
  const dispatch = useDispatch()

  const playingAudio = useSelector(playingAudioSelector)
  const isPlaying = useSelector(isPlayingSelector)

  // useEffect(() => {
  // const audioFile = new Blob([defaultAudio])
  // console.log(defaultAudio)
  // console.log(new Blob(defaultAudio))

  // dispatch(addAudio([audioFile]))
  // }, [])

  function handlePlayPause() {
    dispatch(setIsPlaying(!isPlaying))
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
        <Typography>1:16</Typography>
        <Slider min={0} max={182} defaultValue={76} valueLabelDisplay="auto" />
        <Typography>3:02</Typography>
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
