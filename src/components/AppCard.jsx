import React, { useState, useRef, useEffect } from "react"

import { Button, Card, Tab, Tabs, Typography } from "@mui/material"

import AudioPlayer from "Components/AudioPlayer"
import AudioList from "Components/AudioList"

function AppCard() {
  const [activeTab, setActiveTab] = useState("player")

  function handleTabChange(e, newValue) {
    setActiveTab(newValue)
  }

  return (
    <Card style={{ width: "100%", maxWidth: "20rem" }}>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <Tab value="player" label="Player" />
        <Tab value="list" label="List" />
      </Tabs>
      {activeTab === "player" ? <AudioPlayer /> : <AudioList />}
    </Card>
  )
}

export default AppCard
