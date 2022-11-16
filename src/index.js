import { create as createSlider } from "../node_modules/nouislider/dist/nouislider.min.mjs"
import {
  createAudio,
  setAudioListeners,
  setAudioMetadata,
  setControlListeners,
  updateAudio,
  updateControls
} from "./modules/audioModule.js"

const inputDuration = document.querySelector("#inputDuration")
const inputFile = document.querySelector("#inputFile")
const btnPlayPause = document.querySelector("#btnPlayPause")
const btnPrev = document.querySelector("#btnPrev")
const btnNext = document.querySelector("#btnNext")
const playerImg = document.querySelector("#mediaPlayer > img")
const playerTitle = document.querySelector("#mediaPlayer .card-title")
const playerArtistAlbum = document.querySelector("#mediaPlayer .card-text")

createSlider(inputDuration, {
  start: 0,
  range: { min: 0, max: 236 },
  connect: "lower",
  animate: false,
  keyboardPageMultiplier: 30
})

let isDragging = false
inputDuration.noUiSlider.on("start", () => {
  isDragging = true
})
inputDuration.noUiSlider.on("end", () => {
  isDragging = false
})

let audio = null
inputFile.onchange = (e) => {
  // Do nothing if file hasn't been selected
  if (e.target.files.length === 0) {
    return
  }

  // Check if file has been uploaded for the first time or reuploaded
  if (!audio) {
    audio = createAudio(e.target.files[0])
    setAudioListeners(audio, isDragging, inputDuration)

    toggleControls(true)
    setControlListeners(audio, inputDuration, btnPrev, btnNext, btnPlayPause)
  } else {
    updateAudio(audio, e.target.files[0])
  }

  // CHANGE IT LATER!
  // Wait 'till audio is ready for some actions
  audio.ondurationchange = () => {
    updateControls(audio, inputDuration, btnPlayPause)
  }
  audio.onloadedmetadata = () => {
    console.log("Metadata is ready")
    // setAudioMetadata(
    //   e.target.files[0],
    //   playerImg,
    //   playerTitle,
    //   playerArtistAlbum
    // )
  }
}

function toggleControls(flag) {
  inputDuration.toggleAttribute("disabled", !flag)
  btnPlayPause.toggleAttribute("disabled", !flag)
  btnPrev.toggleAttribute("disabled", !flag)
  btnNext.toggleAttribute("disabled", !flag)
}
