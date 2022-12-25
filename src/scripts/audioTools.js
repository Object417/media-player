import { parseBlob } from "music-metadata-browser"

async function getAudioMetadata(audioFile) {
  const metadata = await parseBlob(audioFile)

  console.log(metadata)
}
function updateAudio(audio, audioFile) {
  const audioUrl = URL.createObjectURL(audioFile)
  audio.setAttribute("src", audioUrl)
  audio.load()
}

export { getAudioMetadata, updateAudio }
