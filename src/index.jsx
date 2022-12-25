import { CssBaseline } from "@mui/material"
import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import "./styles/index.scss"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <CssBaseline />
  </StrictMode>
)