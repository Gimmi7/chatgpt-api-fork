import dotenv from 'dotenv-safe'
import { ChatGPTAPIBrowser } from 'src'

dotenv.config()

const email = process.env.OPENAI_EMAIL
const password = process.env.OPENAI_PASSWORD

const api = new ChatGPTAPIBrowser({
  email,
  password,
  isGoogleLogin: true,
  debug: false,
  minimize: true
})

export default api
