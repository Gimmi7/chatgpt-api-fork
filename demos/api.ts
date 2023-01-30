import dotenv from 'dotenv-safe'
import { oraPromise } from 'ora'
import { setInterval } from 'timers/promises'

import { ChatGPTAPI } from '../src/chatgpt-api'
import { getOpenAIAuth } from '../src/openai-auth'

dotenv.config()

const auth = await getOpenAIAuth({
  email: process.env.OPENAI_EMAIL,
  password: process.env.OPENAI_PASSWORD,
  isGoogleLogin: true
})

const api = new ChatGPTAPI(auth)
api.initSession()

const prompt =
  'Write a python version of bubble sort. Do not include example usage.'
const rsp = await oraPromise(api.sendMessage(prompt), { text: prompt })
console.log(rsp)

const parr = []
for (let i = 0; i < 10; i++) {
  const p = oraPromise(api.sendMessage(prompt), { text: i + ':' + prompt })
  parr[i] = p
}

console.log('start waitting', Date.now())
Promise.all(parr).then((res) => {
  console.log(res)
})

const loop = new Promise((resolve, reject) => {})

await loop
