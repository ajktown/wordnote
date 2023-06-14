import axios from 'axios'
import { CustomizedAxiosResponse, PaginationRoot } from '../index.interface'
import { WordData } from './interfaces'
import { ISemester } from '../semesters/index.interface'
import { GetWordParams } from './interfaces/index.search-params'

export interface GetWordsApi extends PaginationRoot {
  words: WordData[]
  semester: undefined | ISemester
}

export const getWordsApi = async (
  params?: Partial<GetWordParams>,
): Promise<CustomizedAxiosResponse<GetWordsApi>> => {
  const url = `/v1/word-ids`
  const res = await axios.get(url, { params })

  return [res.data, res]
}
