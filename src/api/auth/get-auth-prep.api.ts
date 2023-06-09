import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'

interface PrivateIOauthPayload {
  userEmail: string
  userId: string
  profileImageUrl: string
}
interface GetAuthPrepResInfo {
  env: {
    currentEnv: string // StrictlyEnv
    available: string[]
  }
}
interface PrivateGetAuthPrepResYesSignedIn extends GetAuthPrepResInfo {
  isSignedIn: true
  signedInUserInfo: PrivateIOauthPayload
}

interface PrivateGetAuthPrepResNoSignedIn extends GetAuthPrepResInfo {
  isSignedIn: false
  signedInUserInfo: null
}

export type GetAuthPrepRes =
  | PrivateGetAuthPrepResYesSignedIn
  | PrivateGetAuthPrepResNoSignedIn

export const getAuthPrepApi = async (): Promise<
  CustomizedAxiosResponse<GetAuthPrepRes>
> => {
  const url = `/v1/auth/prep`
  const res = await axios.get(url)
  return [res.data, res]
}
