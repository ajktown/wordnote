import { atom } from 'recoil'
import { Rkp } from '../index.keys'
import { WordData } from '@/api/words/interfaces'

/** Private Recoil Key */
// enum Prk {} // No Private Recoil Key at this point

/** Private Recoil Key */
enum Prk {
  SearchInputState = `SearchInputState`,
  SearchedByDialogTermState = `SearchedByDialogTermState`,
  SearchedWordsByDialogTermState = `SearchedWordsByDialogTermState`,
}

export const searchInputState = atom<string>({
  key: Rkp.SearchInput + Prk.SearchInputState,
  default: ``,
})

// if empty, the dialog does not show
// if not empty, the dialog shows the word cards that are searched by the word
export const dialogSearchedTermState = atom<null | string>({
  key: Rkp.SearchInput + Prk.SearchedByDialogTermState,
  default: null,
})

type PrivateTermDialogSearchedResultState =
  | undefined // loading
  | null // failed to load; something went wrong
  | WordData[]

// searchedWordsByDialogTermState does not define whether dialog is open or not.
export const termDialogSearchedResultState =
  atom<PrivateTermDialogSearchedResultState>({
    key: Rkp.SearchInput + Prk.SearchedWordsByDialogTermState,
    default: undefined,
  })
