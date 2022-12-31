import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  playingAudioSelector,
  isPlayingSelector,
  currentTimeSelector,
  setCurrentTime,
  setDisplayCurrentTime,
  isSlidingSelector
} from "Store/slices/audioSlice"

function AudioElement() {
  const dispatch = useDispatch()

  const playingAudio = useSelector(playingAudioSelector)
  const isPlaying = useSelector(isPlayingSelector)
  const currentTime = useSelector(currentTimeSelector)
  const isSliding = useSelector(isSlidingSelector)

  const audioElementRef = useRef()

  useEffect(() => {
    isPlaying ? audioElementRef.current.play() : audioElementRef.current.pause()
  }, [isPlaying])

  useEffect(() => {
    audioElementRef.current.currentTime = currentTime
  }, [currentTime])

  function handleTimeUpdate(e) {
    if (!isSliding) {
      dispatch(setDisplayCurrentTime(audioElementRef.current.currentTime))
    }
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
