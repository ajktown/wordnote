import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'
import { GetActionGroupRes } from './index.interface'
import { ActionGroupFixedId } from '@/constants/action-group.constant'

export const getActionGroupDailyPostWordChallengeApi = async (): Promise<
  CustomizedAxiosResponse<GetActionGroupRes>
> => {
  const url = `/v1/action-groups/${ActionGroupFixedId.DailyPostWordChallenge}`
  const res = await axios.get(url)
  return [res.data, res]
}
