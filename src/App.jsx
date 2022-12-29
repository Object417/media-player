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
import AudioPlayer from "Components/AudioPlayer"
import AudioList from "Components/AudioList"
import { addAudio } from "Store/thunks/audioThunks"

function App() {
  const [activeTab, setActiveTab] = useState("player")
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")

  function handleTabChange(e, newValue) {
    setActiveTab(newValue)
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
        <Card style={{ width: "100%", maxWidth: "25rem" }}>
          {/* <CardHeader> */}
          <Tabs
            // component={CardHeader}
            value={activeTab}
            onChange={handleTabChange}
          >
            <Tab value="player" label="Player" />
            <Tab value="list" label="List" />
          </Tabs>
          {/* </CardHeader> */}
          {activeTab === "player" ? <AudioPlayer /> : <AudioList />}
        </Card>
        <CssBaseline />
      </ThemeProvider>
    </Provider>
  )
}

export default App
