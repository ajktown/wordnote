import { CustomizedAxiosResponse } from '../index.interface'
import axios from 'axios'
import { PostWordReqDto, WordData } from './interfaces'
import { GetSemestersResDTO } from '../semesters/get-semesters.api'

interface PostWordRes {
  postedWord: WordData
  semesters: GetSemestersResDTO
}

export const postWordApi = async (
  newWord: PostWordReqDto,
): Promise<CustomizedAxiosResponse<PostWordRes>> => {
  const url = `/v1/words`
  const res = await axios.post(url, newWord)
  return [res.data, res] // TODO: Why does it not warn me when I returned res.data only? Fix this.
}
