import { atom } from 'recoil'

/** Private Recoil Key */
enum Prk {
  IsApiConnectFailed = `IsApiConnectFailed`,
}

export const isApiConnectFailed = atom<boolean>({
  key: Prk.IsApiConnectFailed,
  default: false,
})
