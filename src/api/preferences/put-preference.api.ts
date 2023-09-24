import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import { IPreference, PreferenceModifiable } from './index.interface'

export const putPreferenceApi = async (
  modifying: Partial<PreferenceModifiable>,
): Promise<CustomizedAxiosResponse<IPreference>> => {
  const url = `/v1/preference`
  const res = await axios.put(url, modifying)
  return [res.data, res]
}
