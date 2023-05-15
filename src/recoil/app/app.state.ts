import { atom } from 'recoil'
import { Rkp } from '../index.keys'
import { GetAuthPrepRes } from '@/api/auth/get-auth-prep.api'

/** Private Recoil Key */
// enum Prk {} // No Private Recoil Key at this point

export const isAppBootedState = atom<boolean>({
  key: Rkp.App,
  default: false,
})

type PrivateAuthPrepState =
  | undefined // not loaded
  | null // failed to load
  | GetAuthPrepRes
export const authPrepState = atom<PrivateAuthPrepState>({
  key: Rkp.App,
  default: undefined,
})
