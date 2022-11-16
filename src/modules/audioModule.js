// import * as musicMetadata from "../../node_modules/music-metadata-browser/lib/index.js"

function createAudio(file) {
  const audioURL = URL.createObjectURL(file)
  return new Audio(audioURL)
}

function updateAudio(audioElem, file) {
  const audioURL = URL.createObjectURL(file)
  audioElem.setAttribute("src", audioURL)
  audioElem.load()
}

async function getAudioMetadata(file) {
  const metadata = await musicMetadata.parseBlob(file)

  const audioTitle = metadata.common.title || "Unknown title"
  const audioArtist = metadata.common.artists?.join(", ") || "Unknown artist"
  const audioAlbum = metadata.common.album || "Unknown album"
  const audioImg = metadata.common.picture
    ? URL.createObjectURL(new Blob(metadata.common.picture[0].data.buffer))
    : "./public/img/noImg.webp"

  return {
    title: audioTitle,
    artist: audioArtist,
    album: audioAlbum,
    img: audioImg
  }
}

function setAudioMetadata(file, imgElem, titleElem, artistAlbumElem) {
  const { title, artist, album, img } = getAudioMetadata(file)

  imgElem.setAttribute("scr", img)
  titleElem.textContent = title
  artistAlbumElem.textContent = `${artist} — ${album}`
}

function setAudioListeners(audio, isDragging, inputDuration) {
  audio.ontimeupdate = () => {
    if (!isDragging) {
      inputDuration.noUiSlider.set(audio.currentTime)
      // update current time label
    }
  }
}

function setControlListeners(
  audio,
  inputDuration,
  btnPrev,
  btnNext,
  btnPlayPause
) {
  btnPrev.addEventListener("click", () => {
    audio.currentTime -= 5 // change magic number to a const
  })
  btnNext.addEventListener("click", () => {
    audio.currentTime += 5
  })
  btnPlayPause.addEventListener("click", () => {
    if (!audio.paused) {
      audio.pause()
      btnPlayPause.querySelector("i").className = "bi bi-play-fill" // maybe change on condition
      return
    }

    try {
      audio.play()
      btnPlayPause.querySelector("i").className = "bi bi-pause-fill"
    } catch (err) {
      console.log("Can't play the audio", err) // change it later
    }
  })
  inputDuration.noUiSlider.on("change", () => {
    audio.currentTime = Number(inputDuration.noUiSlider.get())
  })
}

function updateControls(audio, inputDuration, btnPlayPause) {
  inputDuration.noUiSlider.updateOptions({
    start: audio.currentTime,
    range: { min: 0, max: audio.duration }
  })

  btnPlayPause.querySelector("i").className = audio.paused
    ? "bi bi-play-fill"
    : "bi bi-pause-fill"
}

export {
  createAudio,
  updateAudio,
  getAudioMetadata,
  setAudioMetadata,
  setAudioListeners,
  setControlListeners,
  updateControls
}
