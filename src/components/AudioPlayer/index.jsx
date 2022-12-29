import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addAudio } from "Store/thunks/audioThunks"
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
  Typography
} from "@mui/material"
import { Pause, PlayArrow } from "@mui/icons-material"

import noImg from "Assets/imgs/no-img.webp"
import AudioElement from "./AudioElement"
// import defaultAudio from "Assets/audios/38 - Sweet Darkness.mp3"

function AudioPlayer() {
  const dispatch = useDispatch()

  const audio = useSelector(playingAudioSelector)
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

  if (!audio) {
    return <Alert severity="warning">No audio is playing now</Alert>
  }

  return (
    <>
      <AudioElement audio={audio} isPlaying={isPlaying} />
      <CardMedia component="img" image={audio.cover || noImg} />
      <CardContent>
        <Typography variant="h5" component="h5">
          {audio.title}
        </Typography>
        <Typography variant="subtitle1" component="h6">
          {`${audio.artists.join(", ")} — ${audio.album}`}
        </Typography>
      </CardContent>
      <CardActions>
        <ButtonGroup>
          <IconButton onClick={handlePlayPause}>
            {isPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
        </ButtonGroup>
      </CardActions>
    </>
  )
}

export default AudioPlayer
