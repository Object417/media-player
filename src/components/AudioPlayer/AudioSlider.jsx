import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  displayCurrentTimeSelector,
  playingAudioSelector,
  setCurrentTime,
  setDisplayCurrentTime
} from "Store/slices/audioSlice"

import { Slider } from "@mui/material"

import getFormattedTime from "Components/getFormattedTime"

function AudioSlider() {
  // Count the number of re-renders
  // const renderCounter = useRef(0)
  // useEffect(() => {
  // renderCounter.current++
  // console.log("AudioSlider " + renderCounter.current)
  // })

  const dispatch = useDispatch()

  const playingAudio = useSelector(playingAudioSelector)
  const displayCurrentTime = useSelector(displayCurrentTimeSelector)

  const [sliderPos, setSliderPos] = useState(0)
  const [isSliding, setIsSliding] = useState(false)

  function handleTimeChange(e, newValue) {
    setIsSliding(false)

    dispatch(setDisplayCurrentTime(newValue))
    dispatch(setCurrentTime(newValue))
  }

  // TODO: Optimize re-renders
  function handleTimeSearch(e, newValue) {
    setIsSliding(true)
    setSliderPos(newValue)
  }

  return (
    <Slider
      value={isSliding ? sliderPos : displayCurrentTime}
      onChange={handleTimeSearch}
      onChangeCommitted={handleTimeChange}
      min={0}
      max={Math.floor(playingAudio?.duration || 0)}
      valueLabelDisplay="auto"
      valueLabelFormat={getFormattedTime}
      disabled={!playingAudio}
    />
  )
}

export default AudioSlider