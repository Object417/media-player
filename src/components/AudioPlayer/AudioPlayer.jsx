import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { playingAudioSelector } from "Store/slices/audioSlice"

import {
  Alert,
  ButtonGroup,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from "@mui/material"

import noImg from "Assets/imgs/no-img.webp"

import AudioTimeBar from "./AudioTimeBar"
import AudioControls from "./AudioControls"

function AudioPlayer() {
  const playingAudio = useSelector(playingAudioSelector)

  return playingAudio ? (
    <>
      <CardMedia component="img" image={playingAudio?.cover || noImg} />
      <CardContent>
        <Typography variant="h5" component="h5">
          {playingAudio?.title || "Song title"}
        </Typography>
        <Typography variant="subtitle1" component="h6">
          {playingAudio?.artists?.join(", ") || "Artists"}
          {" — "}
          {playingAudio?.album || "Album"}
        </Typography>
      </CardContent>

      <AudioTimeBar />

      <CardActions>
        <AudioControls />
      </CardActions>
    </>
  ) : (
    <Alert severity="info">No audio is currently playing</Alert>
  )
}

export default AudioPlayer
