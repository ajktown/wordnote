import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'

interface IOauthPayload {
  userEmail: string
  userId: string
  profileImageUrl: string
}

interface GetAuthPrepEnvInfo {
  currentEnv: string // StrictlyEnv
  isProduction: boolean
  available: string[]
}

interface PrivateGetAuthPrepResYesSignedIn {
  isSignedIn: true
  signedInUserInfo: IOauthPayload
  env: GetAuthPrepEnvInfo
}

interface PrivateGetAuthPrepResNoSignedIn {
  isSignedIn: false
  signedInUserInfo: null
  env: GetAuthPrepEnvInfo
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
