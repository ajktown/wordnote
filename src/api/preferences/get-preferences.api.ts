import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import { IPreference } from './index.interface'

export const getPreferencesApi = async (): Promise<
  CustomizedAxiosResponse<IPreference>
> => {
  const url = `/v1/preferences`
  const res = await axios.get(url)
  return [res.data, res]
}
