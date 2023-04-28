import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import { CredentialResponse } from '@react-oauth/google'

interface PrivatePostBody {
  clientId: string
  credential: string
}
export const postAuthGoogleApi = async (
  cr: CredentialResponse,
): Promise<CustomizedAxiosResponse<void>> => {
  const url = `/v1/auth/google`
  const body: PrivatePostBody = {
    clientId: cr.clientId || ``,
    credential: cr.credential || ``,
  }
  const res = await axios.post(url, body)
  return [res.data, res]
}
