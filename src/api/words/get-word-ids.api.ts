import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import { GetWordParams } from './interfaces/index.search-params'

type PrivateGetWordIdsApi = string[]
export const getWordIdsApi = async (
  params?: Partial<GetWordParams>,
): Promise<CustomizedAxiosResponse<PrivateGetWordIdsApi>> => {
  const url = `/v1/word-ids`
  const res = await axios.get(url, { params })

  return [res.data, res]
}
