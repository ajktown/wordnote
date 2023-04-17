import { atom } from 'recoil'

/** Private Recoil Key */
enum Prk {
  SearchInput = `SearchInput`,
}

export const searchInputState = atom<string>({
  key: Prk.SearchInput,
  default: ``,
})
