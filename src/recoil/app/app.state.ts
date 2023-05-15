import { atom, selector } from 'recoil'
import { Rkp, Rks } from '../index.keys'
import { GetAuthPrepRes } from '@/api/auth/get-auth-prep.api'

/** Private Recoil Key */
enum Prk {
  AuthPrepState = `AuthPrepState`,
}

export const isAppBootedState = atom<boolean>({
  key: Rkp.App,
  default: false,
})

type PrivateAuthPrepState =
  | undefined // not loaded
  | null // failed to load
  | GetAuthPrepRes
export const authPrepState = atom<PrivateAuthPrepState>({
  key: Rkp.App + Prk.AuthPrepState,
  default: undefined,
})

export const isAppBootedSelector = selector<boolean>({
  key: Rkp.App + Rks.Selector,
  get: ({ get }) => {
    const got = get(authPrepState)
    return got !== undefined
  },
})
