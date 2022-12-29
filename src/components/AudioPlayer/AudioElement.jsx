import React, { useEffect, useRef } from "react"

function AudioElement({ audio, isPlaying }) {
  const audioElementRef = useRef()

  useEffect(() => {
    isPlaying ? audioElementRef.current.play() : audioElementRef.current.pause()
  }, [isPlaying])

  return (
    <audio ref={audioElementRef} src={audio.url} style={{ display: "none" }} />
  )
}

export default AudioElement
