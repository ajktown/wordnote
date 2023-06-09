import axios from 'axios'
import { CustomizedAxiosResponse, PaginationRoot } from '../index.interface'
import { WordData } from './interfaces'
import { ISemester } from '../semesters/index.interface'

export interface GetWordsApi extends PaginationRoot {
  words: WordData[]
  semester: undefined | ISemester
}

export const getWordsApi = async (): Promise<
  CustomizedAxiosResponse<GetWordsApi>
> => {
  const url = `/v1/words`
  const res = await axios.get(url)
  return [res.data, res]
}
