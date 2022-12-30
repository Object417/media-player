import { createSlice } from "@reduxjs/toolkit"

const appTabsSlice = createSlice({
  name: "appTabs",
  initialState: {
    active: "player"
  },
  reducers: {
    // typeof payload === string
    setActiveTab: (state, { payload }) => {
      state.active = payload
    }
  }
})

export const activeTabSelector = (state) => state.tabs.active
export const { setActiveTab } = appTabsSlice.actions
export default appTabsSlice.reducer
