import { CustomizedAxiosResponse } from '../index.interface'
import axios from 'axios'
import { WordData } from './words.interface'

export const postWordApi = async (
  newWord: WordData,
): Promise<CustomizedAxiosResponse<WordData>> => {
  const url = `/v1/words`
  const res = await axios.post(url, newWord)
  return [res.data, res] // TODO: Why does it not warn me when I returned res.data only? Fix this.
}
