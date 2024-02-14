// ! Since WordnoteGPT only uses isTodayHandled, others are commented out

// type IActionLevel = 0 | 1 | 2 | 3 | 4

// interface IAction extends DataBasics {
//   id: string
//   ownerID: string
//   groupId: string
//   message: string
// }

// export interface IActionDerived extends IAction {
//   yyyymmdd: string
//   level: IActionLevel // level is 100% decided by the ActionGroup
// }

// export interface IActionGroup extends DataBasics {
//   name: string
// }

export interface GetActionGroupRes {
  // props: IActionGroup
  // actions: IActionDerived[]
  isTodayHandled: boolean
  // totalCount: number
}
