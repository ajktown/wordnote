import axios from 'axios'
import { WordData, WordDataModifiable } from './interfaces'
import { CustomizedAxiosResponse } from '../index.interface'

export const putWordByIdApi = async (
  wordId: string,
  modifying: Partial<WordDataModifiable>,
): Promise<CustomizedAxiosResponse<WordData>> => {
  const url = `/v1/words/${wordId}`
  const res = await axios.put(url, modifying)
  return [res.data, res]
}
