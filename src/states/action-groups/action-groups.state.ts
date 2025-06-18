import { atom } from 'recoil'
import { Rkp } from '../index.keys'

/** Private Recoil Key */
enum Prk {
  IsWordPostedDaily = `IsWordPostedDaily`,
}

type PrivateIsWordPostedDailyState =
  | undefined // it is being loaded (the loading mark should be visible in the UI)
  | null // nothing is showing.
  | boolean // if false; should let the user know that daily commitment has not been done
export const isWordPostedDailyState = atom<PrivateIsWordPostedDailyState>({
  key: Rkp.App + Prk.IsWordPostedDaily,
  default: null, // AJK Town prefers undefined as a default value, but this is a special case
})
