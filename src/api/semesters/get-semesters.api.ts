import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import { ISemester } from './index.interface'

export interface GetSemestersResDTO {
  // highly recommend frontend to use undefined as default
  latestSemesterCode: number | undefined // undefined if there is no semester
  semesters: ISemester[]
}

export const getSemestersApi = async (): Promise<
  CustomizedAxiosResponse<GetSemestersResDTO>
> => {
  const url = `/v1/semesters`
  const res = await axios.get(url)
  return [res.data, res]
}
