import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import { IPreference } from './index.interface'

export const putPreferenceApi = async (): Promise<
  CustomizedAxiosResponse<IPreference>
> => {
  const url = `/v1/preference`
  const res = await axios.put(url)
  return [res.data, res]
}
