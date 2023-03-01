import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import { WordData } from './words.interface'

const URL = "/v1/words"

export const getWordsApi = async (): Promise<CustomizedAxiosResponse<WordData[]>> => {
  const res = await axios.get(URL)
  return [res.data, res]
}
