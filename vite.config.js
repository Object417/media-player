import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig(({ mode, command, ssrBuild }) => {
  return {
    resolve: {
      alias: {
        "@": resolve(__dirname, "src/")
      }
    },
    plugins: []
  }
})
