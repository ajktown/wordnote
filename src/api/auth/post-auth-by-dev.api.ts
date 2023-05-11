import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import { PostOauthRes } from './index.interface'

export const postAuthByDevApi = async (): Promise<
  CustomizedAxiosResponse<PostOauthRes>
> => {
  const url = `/v1/auth/dev`

  const res = await axios.post(url)
  return [res.data, res]
}
