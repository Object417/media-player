import { createAsyncThunk } from "@reduxjs/toolkit"
import { parseBlob } from "music-metadata-browser"

// typeof files === Array
const addAudio = createAsyncThunk("audio/addAudio", async (files, thunkAPI) => {
  let res = []
  for (let file of files) {
    const { format, common } = await parseBlob(file)

    let coverURL = null
    if (common?.picture.length > 0) {
      // let coverFile = new Blob([common.picture[0].data.buffer])
      let coverFile = new Blob([common.picture[0].data])
      coverURL = URL.createObjectURL(coverFile)
    }

    // FIXME: Can just pass format and common objects,
    // and then decide what and how to display
    res.push({
      id: Date.now(),
      url: URL.createObjectURL(file),
      cover: coverURL,
      title: common.title || "Unknown title",
      artists: common.artists || ["Unknown artist"],
      album: common.album || "Unknown album",
      duration: format.duration
    })
  }

  return res
})

export { addAudio }
