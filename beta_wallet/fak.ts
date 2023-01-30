import * as fs from 'fs'
import { oraPromise } from 'ora'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import api from './api'
import { getdirname } from './util'

// frequently appearing keywords
async function fak(topic: string) {
  await api.initSession()

  const prompt = `The most frequently appearing keywords in ${topic}-related searches.`

  const res = await oraPromise(api.sendMessage(prompt), {
    text: prompt
  })

  console.log(res.response)
  const keywords = extract_keywords(res.response)
  console.log(keywords)

  write_fak(keywords)

  await api.closeSession()
}

function extract_keywords(response: string): RegExpMatchArray {
  const pattern = /(?<=\d\. ).*?(?=(\n|\.|$))/g
  const arr = response.match(pattern)
  return arr
}

async function write_fak(keywords: Iterable<string>) {
  const filename = getdirname(import.meta.url) + '/fak.txt'

  let dedup = new Set(keywords)
  if (fs.existsSync(filename)) {
    const bf = fs.readFileSync(filename, 'utf-8')
    const old_keywords = bf.toString().split('\n')
    dedup = new Set([...dedup, ...old_keywords])
  }
  const arr = Array.from(dedup)
  fs.writeFileSync(filename, arr.join('\n'), { encoding: 'utf-8', flag: 'w' })
}

fak('web3-wallet').catch((err) => {
  console.error(err)
  process.exit(1)
})
