import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  playingAudioSelector,
  isPlayingSelector,
  currentTimeSelector,
  setCurrentTime,
  setDisplayCurrentTime
} from "Store/slices/audioSlice"

function AudioElement() {
  const dispatch = useDispatch()

  const playingAudio = useSelector(playingAudioSelector)
  const isPlaying = useSelector(isPlayingSelector)
  const currentTime = useSelector(currentTimeSelector)

  const audioElementRef = useRef()

  useEffect(() => {
    if (!playingAudio) {
      return () => {}
    }

    isPlaying ? audioElementRef.current.play() : audioElementRef.current.pause()
  }, [isPlaying])

  useEffect(() => {
    if (!playingAudio) {
      return () => {}
    }

    audioElementRef.current.currentTime = currentTime
  }, [currentTime])

  function handleTimeUpdate(e) {
    const currentTime = Math.floor(audioElementRef.current.currentTime)
    dispatch(setDisplayCurrentTime(currentTime))
  }

  if (!playingAudio) {
    return null
  }

  return (
    <audio
      ref={audioElementRef}
      src={playingAudio?.url}
      style={{ display: "none" }}
      onTimeUpdate={handleTimeUpdate}
    />
  )
}

export default AudioElement
