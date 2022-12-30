import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { activeTabSelector, setActiveTab } from "Store/slices/appTabsSlice"

import { Card, Tab, Tabs } from "@mui/material"

import AudioPlayer from "Components/AudioPlayer"
import AudioList from "Components/AudioList"

function AppCard() {
  const dispatch = useDispatch()
  const activeTab = useSelector(activeTabSelector)

  function handleTabChange(e, newValue) {
    dispatch(setActiveTab(newValue))
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
