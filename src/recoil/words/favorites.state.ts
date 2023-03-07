import { atom } from 'recoil'

enum PrivateFavoriteRecoilKey {
  IsFavoriteClicked = `IsFavoriteClicked`,
}

export const isFavoriteClickedState = atom<boolean>({
  key: PrivateFavoriteRecoilKey.IsFavoriteClicked,
  default: false,
})
