import { createTheme } from "@mui/material/styles"

const themes = {}
;["light", "dark"].forEach((mode) => {
  themes[mode] = createTheme({
    palette: { mode }
  })
})

const lightTheme = themes.light
const darkTheme = themes.dark

export { lightTheme, darkTheme }
