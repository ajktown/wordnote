import { GlobalLanguageCode } from '@/global.interface'
import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import { GetWordParams } from './interfaces/index.search-params'

interface PrivateGetWordIdsApi {
  wordIds: string[]
  daysAgo: number[]
  languages: GlobalLanguageCode[]
  tags: string[]
}
export const getWordIdsApi = async (
  params?: Partial<GetWordParams>,
): Promise<CustomizedAxiosResponse<PrivateGetWordIdsApi>> => {
  const url = `/v1/word-ids`
  const res = await axios.get(url, { params })

  return [res.data, res]
}
