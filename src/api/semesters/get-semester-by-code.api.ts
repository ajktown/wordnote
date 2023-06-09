import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import { ISemester, ISemesterDetailedInfo } from './index.interface'

export const getSemesterByCodeApi = async (
  code: number,
): Promise<
  CustomizedAxiosResponse<ISemester & { details: ISemesterDetailedInfo }>
> => {
  const url = `/v1/semesters/${code}`
  const res = await axios.get(url)
  return [res.data, res]
}
