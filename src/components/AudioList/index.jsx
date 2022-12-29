import React from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  deleteAudio,
  audioListSelector,
  setPlayingID
} from "Store/slices/audioSlice"
import { addAudio } from "Store/thunks/audioThunks"

import {
  Alert,
  Avatar,
  ButtonGroup,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material"
import { Add, DragHandle, Delete } from "@mui/icons-material"

import noImg from "Assets/imgs/no-img.webp"

function AudioList() {
  const audioList = useSelector(audioListSelector)
  const dispatch = useDispatch()

  function handleAudioUpload(e) {
    const files = Array.from(e.target.files)

    // Do nothing if files weren't uploaded
    if (files.length > 0) {
      dispatch(addAudio(files))
    }
  }

  function handleAudioDelete(audioID) {
    dispatch(deleteAudio(audioID))
  }

  function handleAudioPlay(audioID) {
    dispatch(setPlayingID(audioID))
  }

  return (
    <List>
      {audioList.length ? (
        audioList.map((audioObj) => (
          <ListItemButton
            key={audioObj.id}
            onClick={() => handleAudioPlay(audioObj.id)}
          >
            <ListItemAvatar>
              <Avatar src={audioObj.cover || noImg} />
            </ListItemAvatar>
            <ListItemText
              primary={audioObj.title}
              secondary={audioObj.artists.join(", ")}
            />
            <ButtonGroup>
              <IconButton
                edge="end"
                onClick={() => handleAudioDelete(audioObj.id)}
              >
                <Delete />
              </IconButton>
              <IconButton edge="end">
                <DragHandle />
              </IconButton>
            </ButtonGroup>
          </ListItemButton>
        ))
      ) : (
        <Alert severity="info">The list is empty</Alert>
      )}
      <ListItemButton component="label" htmlFor="$uploadAudio">
        <ListItemIcon>
          <Add />
        </ListItemIcon>
        <ListItemText primary="Upload audio(s)" />
        <input
          type="file"
          accept="audio/*"
          multiple
          id="$uploadAudio"
          style={{ display: "none" }}
          onChange={handleAudioUpload}
        />
      </ListItemButton>
    </List>
  )
}

export default AudioList
