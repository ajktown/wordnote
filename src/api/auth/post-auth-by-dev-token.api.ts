import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import { PostOauthRes } from './index.interface'

export const postAuthByDevTokenApi = async (): Promise<
  CustomizedAxiosResponse<PostOauthRes>
> => {
  const url = `/v1/auth/dev-token`

  const res = await axios.post(url)
  return [res.data, res]
}
