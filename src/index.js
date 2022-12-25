import "@/styles/index.scss"
// import "@/scripts/musicMetadataBrowserFix"

import iconPrev from "bootstrap-icons/icons/caret-left-fill.svg?raw"
import iconNext from "bootstrap-icons/icons/caret-right-fill.svg?raw"
import iconPlay from "bootstrap-icons/icons/play-fill.svg?raw"
import iconPause from "bootstrap-icons/icons/pause-fill.svg?raw"

// import { getAudioMetadata, updateAudio } from "./scripts/audioTools"

const inputFile = document.getElementById("inputFile")
const inputDuration = document.getElementById("inputDuration")

const btnPrev = document.getElementById("btnPrev")
const btnNext = document.getElementById("btnNext")
const btnPlayPause = document.getElementById("btnPlayPause")

btnPrev.innerHTML = iconPrev
btnNext.innerHTML = iconNext
btnPlayPause.innerHTML = iconPlay

const playerCover = document.querySelector("#mediaPlayer img")
const playerTitle = document.querySelector("#mediaPlayer .card-title")
const playerAuthorAndAlbum = document.querySelector("#mediaPlayer .card-text")

const audio = new Audio()

inputFile.onchange = (e) => {
  // Do nothing if file hasn't been selected
  if (e.target.files.length === 0) {
    return
  }

  const audioFile = e.target.files[0]
  // updateAudio(audio, audioFile)
  // getAudioMetadata(audioFile)
}
