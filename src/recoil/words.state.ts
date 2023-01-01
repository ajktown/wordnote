import {
  WordData,
  WordDataModifiableKey,
  WordDataModifiableValue,
} from '@/api/words/words.interface'
import { atom, atomFamily, selector } from 'recoil'
import { RecoilKey, RecoilKeySuffix } from './index.keys'
import { searchInputState } from './searchInput.state'

// TODO: Write this writing convention of
// TODO: wordsFamily, wordIdsState, and ModifyingState and ModifiyngModeOn state...

export const wordsFamily = atomFamily<WordData | null, string>({
  key: RecoilKey.Words + RecoilKeySuffix.Family,
  default: null,
})

export const wordIdsState = atom<string[]>({
  key: RecoilKey.WordIds,
  default: [],
})

// TODO: Refactor this two data into a better format
export const modifyingWordFamily = atomFamily<
  WordDataModifiableValue | null,
  WordDataModifiableKey
>({
  key: RecoilKey.Words + RecoilKeySuffix.Family,
  default: null,
})

// TODO: Refactor this two data into a better format
// TODO: I think this will be wordId again.
export const selectedWordForDialogState = atom<null | WordData>({
  key: RecoilKey.Words + RecoilKeySuffix.Dialog,
  default: null, // nothing selected
})

export const filteredWordIdsState = selector<string[]>({
  key: RecoilKey.FilteredWordIds + RecoilKeySuffix.Selector,
  get: ({ get }) => {
    const wordIds = get(wordIdsState)
    const searchInput = get(searchInputState)

    if (searchInput === ``) return wordIds // Return as it is, if it has no search input

    return wordIds.filter((wordId) => {
      const word = get(wordsFamily(wordId))
      if (word === null) return false

      return word.term.includes(searchInput)
    })
  },
})
