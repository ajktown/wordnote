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

type PrivateGetWhoAmIRes =
  | PrivateGetWhoAmIResYesSignedIn
  | PrivateGetWhoAmIResNoSignedIn

export const getWhoAmIApi = async (): Promise<
  CustomizedAxiosResponse<PrivateGetWhoAmIRes>
> => {
  const url = `/v1/auth/who-am-i`
  const res = await axios.get(url)
  return [res.data, res]
}
