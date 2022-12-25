import { Buffer } from "buffer/"
import process from "process"

if (window !== undefined) {
  window.global = globalThis
  window.Buffer = Buffer
  window.process = process
}
