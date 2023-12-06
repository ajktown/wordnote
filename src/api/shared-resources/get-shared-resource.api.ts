import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import { ISharedResource, PostSharedResourceReqDTO } from './index.interface'
import { ISharedWord } from '../words/interfaces'

interface GetSharedResourceRes {
  sharedResource: ISharedResource
  word: null | ISharedWord
}

export const getSharedResourceApi = async (
  reqDto: PostSharedResourceReqDTO,
): Promise<CustomizedAxiosResponse<GetSharedResourceRes>> => {
  const url = `/v1/shared-resource`
  const res = await axios.post(url, reqDto)
  return [res.data, res]
}
