import { WordData } from '@/api/words/words.interface'
import { atom, atomFamily, selector } from 'recoil'
import { RecoilKey, RecoilKeySuffix } from './index.keys'
import { searchInputState } from './searchInput.state'

export const wordsFamily = atomFamily<WordData | null, string>({
  key: RecoilKey.Words + RecoilKeySuffix.Family,
  default: null,
})

export const wordIdsState = atom<string[]>({
  key: RecoilKey.WordIds,
  default: []
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
