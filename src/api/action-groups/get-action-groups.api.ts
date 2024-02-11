import axios from 'axios'
import { CustomizedAxiosResponse } from '../index.interface'

// ! Since WordnoteGPT only uses isTodayHandled, others are commented out
// type IActionLevel = 0 | 1 | 2 | 3 | 4

// interface IAction extends DataBasics {
//   ownerID: string
//   groupId: string
//   level: IActionLevel
//   message: string
// }
// export interface ActionGroupProps {
//   props: IAction
// }
export interface GetActionGroupsResDTO {
  isTodayHandled: boolean
  // totalCount: number
  // domains: ActionGroupProps[]
}

export const getActionGroupsApi = async (): Promise<
  CustomizedAxiosResponse<GetActionGroupsResDTO>
> => {
  const url = `/v1/action-groups`
  const res = await axios.get(url)
  return [res.data, res]
}
