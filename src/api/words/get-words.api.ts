import axios from 'axios'
import { CustomizedAxiosResponse, PaginationRoot } from '../index.interface'
import { WordData } from './interfaces'
import { ISemester } from '../semesters/index.interface'

interface PrivateGetWordsApi extends PaginationRoot {
  words: WordData[]
  semester: undefined | ISemester
}

export const getWordsApi = async (): Promise<
  CustomizedAxiosResponse<PrivateGetWordsApi>
> => {
  const url = `/v1/words`
  const res = await axios.get(url)
  return [res.data, res]
}
