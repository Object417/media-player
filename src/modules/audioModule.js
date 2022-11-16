import { parseBlob } from "../../node_modules/music-metadata-browser/lib/index.js"

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
  const metadata = await parseBlob(file)

  const audioTitle = metadata.common.title || "Unknown title"
  const audioAuthor = metadata.common.artists?.[0] || "Unknown artist"
  const audioAlbum = metadata.common.album || "Unknown album"
  const audioImg = metadata.common.picture
    ? URL.createObjectURL(new Blob(metadata.common.picture[0].data.buffer))
    : "./public/img/noImg.webp"

  return {
    title: audioTitle,
    author: audioAuthor,
    album: audioAlbum,
    img: audioImg
  }
}

export { createAudio, updateAudio, getAudioMetadata }
