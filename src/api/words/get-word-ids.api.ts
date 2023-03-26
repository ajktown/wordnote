import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import { WordSearchParams } from './interfaces/index.search-params'

export const getWordIdsApi = async (
  params: WordSearchParams,
): Promise<CustomizedAxiosResponse<string[]>> => {
  const url = `/v1/words`
  const res = await axios.get(url, { params })
  return [res.data, res]
}
