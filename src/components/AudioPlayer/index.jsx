import {
  Alert,
  ButtonGroup,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from "@mui/material"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import noImg from "Assets/imgs/no-img.webp"
import { Pause, PlayArrow } from "@mui/icons-material"

function AudioPlayer() {
  const audioID = useSelector((state) => state.audio.playingID)
  const audio = useSelector((state) =>
    state.audio.list.find((audio) => audio.id === audioID)
  )

  if (!audio || !audio?.title) {
    return <Alert severity="warning">No audio is playing now</Alert>
  }

  const [isPlaying, setIsPlaying] = useState(false)

  function handlePlayPause() {
    setIsPlaying(!isPlaying)
  }

  return (
    <>
      {/* <audio src={audio.url} isPlaying={isPlaying} /> */}
      <CardMedia component="img" image={audio.cover || noImg} />
      <CardContent>
        <Typography>{audio.title}</Typography>
        <Typography>
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
