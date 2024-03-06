import { atom } from 'recoil'
import { Rkp } from '../index.keys'
import { WordData } from '@/api/words/interfaces'

/** Private Recoil Key */
// enum Prk {} // No Private Recoil Key at this point

/** Private Recoil Key */
enum Prk {
  SearchInputState = `SearchInputState`,
  SearchByWordIdState = `SearchByWordIdState`,
  SearchedWordsByWordIdState = `SearchedWordsByWordIdState`,
}

export const searchInputState = atom<string>({
  key: Rkp.SearchInput + Prk.SearchInputState,
  default: ``,
})

export const searchByWordIdState = atom<string>({
  key: Rkp.SearchInput + Prk.SearchByWordIdState,
  default: ``,
})

type PrivateSearchedWordsByWordIdState =
  | undefined // loading
  | null // failed to load; something went wrong
  | WordData[]
export const searchedWordsByWordIdState =
  atom<PrivateSearchedWordsByWordIdState>({
    key: Rkp.SearchInput + Prk.SearchedWordsByWordIdState,
    default: undefined,
  })
