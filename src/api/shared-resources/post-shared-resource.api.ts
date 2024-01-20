import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import { GetSharedResourceRes } from './get-shared-resource.api'

interface PostSharedResourceReqDTO {
  wordId: undefined | string
  expireAfterSecs: undefined | number
}

type PostSharedResourceRes = GetSharedResourceRes

export const postSharedResourceApi = async (
  reqDto: PostSharedResourceReqDTO,
): Promise<CustomizedAxiosResponse<PostSharedResourceRes>> => {
  const url = `/v1/shared-resource`
  const res = await axios.post(url, reqDto)
  return [res.data, res]
}
