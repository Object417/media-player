import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig(({ mode, command, ssrBuild }) => {
  return {
    mode: mode,
    resolve: {
      alias: {
        "@": resolve(__dirname, "src/")
      }
    },
    plugins: [],
    build: {
      rollupOptions: {
        output: {
          globals: {
            // process: "process/browser"
          }
        }
      }
    }
  }
})
