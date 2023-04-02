import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import { SemesterData } from './index.interface'

export const getSemestersApi = async (): Promise<
  CustomizedAxiosResponse<SemesterData[]>
> => {
  const url = `/v1/semesters`
  const res = await axios.get(url)
  return [res.data, res]
}
