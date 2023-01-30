import { oraPromise } from 'ora'

import api from './api'

async function article(keyword: string) {
  await api.initSession()

  const prompt = `Write an article to introduce ${keyword}. It should be no less than 800 words.`

  const res = await oraPromise(api.sendMessage(prompt), {
    text: prompt
  })
  console.log(res.response)

  await api.closeSession()
}

article('Web3').catch((err) => {
  console.error(err)
  process.exit(1)
})
