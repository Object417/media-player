import React, { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import {
  playingAudioSelector,
  isPlayingSelector
} from "Store/slices/audioSlice"

function AudioElement() {
  const playingAudio = useSelector(playingAudioSelector)
  const isPlaying = useSelector(isPlayingSelector)

  const audioElementRef = useRef()

  useEffect(() => {
    isPlaying ? audioElementRef.current.play() : audioElementRef.current.pause()
  }, [isPlaying])

  return (
    <audio
      ref={audioElementRef}
      src={playingAudio?.url}
      style={{ display: "none" }}
    />
  )
}

export default AudioElement
