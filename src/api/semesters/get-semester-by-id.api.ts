import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import { SemesterData, SemesterDetailedInfo } from './index.interface'

export const getSemesterByIdApi = async (
  id: string,
): Promise<
  CustomizedAxiosResponse<SemesterData & { details: SemesterDetailedInfo }>
> => {
  const url = `/v1/semesters/${id}`
  const res = await axios.get(url)
  return [res.data, res]
}
