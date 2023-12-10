import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import { ISharedResource } from './index.interface'

interface PostSharedResourceReqDTO
  extends Omit<
    ISharedResource,
    | 'id' // handled by API
    | 'ownerId' // handled by API
  > {
  expireAfterSecs: undefined | number
}

interface PostSharedResourceRes {
  postedSharedResource: ISharedResource
}

export const postSharedResourceApi = async (
  reqDto: PostSharedResourceReqDTO,
): Promise<CustomizedAxiosResponse<PostSharedResourceRes>> => {
  const url = `/v1/shared-resource`
  const res = await axios.post(url, reqDto)
  return [res.data, res]
}
