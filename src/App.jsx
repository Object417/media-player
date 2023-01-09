import React, { useEffect, useState } from "react"
import store from "Store/store"
import { Provider, useDispatch } from "react-redux"

import {
  Card,
  CardHeader,
  CssBaseline,
  Tabs,
  Tab,
  ThemeProvider,
  useMediaQuery
} from "@mui/material"
// FIXME: No need to import all themes
import { lightTheme, darkTheme } from "./themes"

import AppCard from "Components/AppCard"
import AudioElement from "Components/AudioPlayer/AudioElement"

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

  return (
    <Provider store={store}>
      <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
        <AppCard />
        <AudioElement />
        <CssBaseline />
      </ThemeProvider>
    </Provider>
  )
}

export default App
