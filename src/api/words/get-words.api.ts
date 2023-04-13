import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import { WordData } from './interfaces'

export const getWordsApi = async (): Promise<
  CustomizedAxiosResponse<WordData[]>
> => {
  const url = `/v1/words`
  const res = await axios.get(url)
  return [res.data, res]
}
