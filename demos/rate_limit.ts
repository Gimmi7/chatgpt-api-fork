import dotenv from 'dotenv-safe'
import { oraPromise } from 'ora'

import { ChatGPTAPIBrowser } from '../src'

dotenv.config()

const email = process.env.OPENAI_EMAIL
const password = process.env.OPENAI_PASSWORD

const api = new ChatGPTAPIBrowser({
  email,
  password,
  debug: false,
  minimize: true,
  isGoogleLogin: true
})
await api.initSession()

const prompt =
  'Write a python version of bubble sort. Do not include example usage.'

for (let i = 0; i < 10; i++) {
  console.log('send ', i)
  const res = await oraPromise(api.sendMessage(prompt), {
    text: i + ':' + prompt
  })
  console.log(i, res.response)
}
