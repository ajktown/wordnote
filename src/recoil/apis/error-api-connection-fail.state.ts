import { atom } from 'recoil'

enum PrivateFavoriteRecoilKey {
  IsApiConnectFailed = `IsApiConnectFailed`,
}

export const isApiConnectFailed = atom<boolean>({
  key: PrivateFavoriteRecoilKey.IsApiConnectFailed,
  default: false,
})
