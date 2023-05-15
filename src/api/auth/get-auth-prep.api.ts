import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'

interface PrivateGetWhoAmIResYesSignedIn {
  isSignedIn: true
  detailedInfo: {
    id: string
  }
}

interface PrivateGetWhoAmIResNoSignedIn {
  isSignedIn: false
}

export type GetAuthPrepRes =
  | PrivateGetWhoAmIResYesSignedIn
  | PrivateGetWhoAmIResNoSignedIn

export const getAuthPrepApi = async (): Promise<
  CustomizedAxiosResponse<GetAuthPrepRes>
> => {
  const url = `/v1/auth/prep`
  const res = await axios.get(url)
  return [res.data, res]
}
