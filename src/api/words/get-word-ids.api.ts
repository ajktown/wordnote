import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import { GetWordParams } from './interfaces/index.search-params'

export const getWordIdsApi = async (
  params?: Partial<GetWordParams>,
): Promise<CustomizedAxiosResponse<string[]>> => {
  const url = `/v1/words-ids`
  const res = await axios.get(url, { params })
  return [res.data, res]
}
