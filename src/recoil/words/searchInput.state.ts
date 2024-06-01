import { atom } from 'recoil'
import { Rkp } from '../index.keys'
import { WordData } from '@/api/words/interfaces'

/** Private Recoil Key */
// enum Prk {} // No Private Recoil Key at this point

/** Private Recoil Key */
enum Prk {
  SearchInputState = `SearchInputState`,
  DialogSearchedTermState = `DialogSearchedTermState`,
  DialogSearchedWordsState = `DialogSearchedWordsState`,
}

export const searchInputState = atom<string>({
  key: Rkp.SearchInput + Prk.SearchInputState,
  default: ``,
})

// if null: the dialog does not show
// if empty string, user has deleted their search input
// if non-empty string: the dialog appears
export const dialogSearchedTermState = atom<null | string>({
  key: Rkp.SearchInput + Prk.DialogSearchedTermState,
  default: null,
})

type PrivateDialogSearchedWordsState =
  | undefined // loading
  | null // failed to load; something went wrong
  | WordData[]

// dialogSearchedWordsState stores the result of dialogSearchedTermState search query
export const dialogSearchedWordsState = atom<PrivateDialogSearchedWordsState>({
  key: Rkp.SearchInput + Prk.DialogSearchedWordsState,
  default: undefined,
})
