// TODO: Implement

import axios from 'axios'
import { WordData } from './words.interface'

export const postWordApi = async (newWord: WordData): Promise<WordData> => {
  const url = `/v1/words`
  const res = await axios.post(url, newWord)
  return res.data
}
