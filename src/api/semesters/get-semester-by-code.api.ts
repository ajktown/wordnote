import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import { SemesterData, SemesterDetailedInfo } from './index.interface'

export const getSemesterByCodeApi = async (
  code: number,
): Promise<
  CustomizedAxiosResponse<SemesterData & { details: SemesterDetailedInfo }>
> => {
  const url = `/v1/semesters/${code}`
  const res = await axios.get(url)
  return [res.data, res]
}
