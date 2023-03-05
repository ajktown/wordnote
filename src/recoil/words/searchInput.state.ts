import { atom } from 'recoil'

enum PrivateSearchInputRecoilKey {
  SearchInput = `SearchInput`,
}

export const searchInputState = atom<string>({
  key: PrivateSearchInputRecoilKey.SearchInput,
  default: ``,
})
