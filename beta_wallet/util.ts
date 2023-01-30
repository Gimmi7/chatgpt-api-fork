import path from 'path'
import { fileURLToPath } from 'url'

export function getfilename(metaUrl: string): string {
  return fileURLToPath(metaUrl)
}

export function getdirname(metaUrl: string): string {
  return path.dirname(getfilename(metaUrl))
}
