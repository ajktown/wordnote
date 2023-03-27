import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import { GetWordParams } from './interfaces/index.search-params'

export const getWordIdsApi = async (
  params?: Partial<GetWordParams>,
): Promise<CustomizedAxiosResponse<string[]>> => {
  const url = `/v1/word-ids`
  const res = await axios.get(url, { params })
  console.log({ res })
  return [res.data, res]
}
