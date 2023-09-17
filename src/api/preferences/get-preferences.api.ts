import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import { IPreference } from './index.interface'

export const getPreferenceApi = async (): Promise<
  CustomizedAxiosResponse<IPreference>
> => {
  const url = `/v1/preference`
  const res = await axios.get(url)
  console.log({getPreferenceApi})

  return [res.data, res]
}
