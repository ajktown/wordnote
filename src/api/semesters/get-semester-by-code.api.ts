import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import { ISemester, SemesterDetailedInfo } from './index.interface'

export const getSemesterByCodeApi = async (
  code: number,
): Promise<
  CustomizedAxiosResponse<ISemester & { details: SemesterDetailedInfo }>
> => {
  const url = `/v1/semesters/${code}`
  const res = await axios.get(url)
  return [res.data, res]
}
