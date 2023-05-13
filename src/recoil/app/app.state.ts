import { atom } from 'recoil'
import { Rkp } from '../index.keys'

/** Private Recoil Key */
// enum Prk {} // No Private Recoil Key at this point

export const isAppBootedState = atom<boolean>({
  key: Rkp.App,
  default: false,
})
