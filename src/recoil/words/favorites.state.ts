import { atom } from 'recoil'

enum PrivateFavoriteRecoilKey {
  DeprecatedIsFavoriteClicked = `DeprecatedIsFavoriteClicked`,
}

export const deprecatedIsFavoriteClickedState = atom<boolean>({
  key: PrivateFavoriteRecoilKey.DeprecatedIsFavoriteClicked,
  default: false,
})
