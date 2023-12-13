import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import { ISharedResource } from './index.interface'
import { ISharedWord } from '../words/interfaces'

interface PostSharedResourceReqDTO {
  wordId: undefined | string
  expireAfterSecs: undefined | number
}

interface PostSharedResourceRes {
  postedSharedResource: ISharedResource
  word: null | ISharedWord
}

export const postSharedResourceApi = async (
  reqDto: PostSharedResourceReqDTO,
): Promise<CustomizedAxiosResponse<PostSharedResourceRes>> => {
  const url = `/v1/shared-resource`
  const res = await axios.post(url, reqDto)
  return [res.data, res]
}
