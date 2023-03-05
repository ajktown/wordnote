import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import { WordData } from './words.interface'

export const getWordByIdApi = async (
  wordId: string,
): Promise<CustomizedAxiosResponse<WordData>> => {
  const url = `/v1/words/${wordId}`
  const res = await axios.get(url)
  return [res.data, res]
}
