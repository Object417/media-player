import { create as createSlider } from "../node_modules/nouislider/dist/nouislider.min.mjs"

const inputDuration = document.querySelector("#inputDuration")
const inputFile = document.querySelector("#inputFile")
const btnPlayPause = document.querySelector("#btnPlayPause")
const btnPrev = document.querySelector("#btnPrev")
const btnNext = document.querySelector("#btnNext")

createSlider(inputDuration, {
  start: 0,
  range: { min: 0, max: 236 },
  connect: "lower",
  animate: false,
  keyboardPageMultiplier: 30
})
