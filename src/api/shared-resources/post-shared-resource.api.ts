import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import {
  PostSharedResourceReqDTO,
  PostSharedResourceResDTO,
} from './index.interface'

export const postSharedResourceApi = async (
  reqDto: PostSharedResourceReqDTO,
): Promise<CustomizedAxiosResponse<PostSharedResourceResDTO>> => {
  const url = `/v1/shared-resource`
  const res = await axios.post(url, reqDto)
  return [res.data, res]
}
