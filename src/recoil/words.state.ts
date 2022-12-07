import { WordData } from '@/api/words/words.interface'
import { atom, atomFamily, selector } from 'recoil'
import { RecoilKey, RecoilKeySuffix } from './index.keys'
import { getWordIdsApi } from '@/api/words/get-word-ids.api'
import { searchInputState } from './searchInput.state'

// TODO: Rename the data later.

export const wordsFamily = atomFamily<WordData | null, string>({
  key: RecoilKey.Words + RecoilKeySuffix.Family,
  default: null
})

export const wordIdsSelector = selector<string[]>({
  key: RecoilKey.Words + RecoilKeySuffix.Selector,
  get: async () => {
    const words = await getWordIdsApi()
    // TODO: Want to set the wordsFamily too when it gets the chunk of data.

    return words
  },
})

export const wordIdsState = atom<string[]>({
  key: RecoilKey.WordIds,
  default: wordIdsSelector,
})

export const filteredWordIdsState = selector<string[]>({
  key: RecoilKey.FilteredWordIds + RecoilKeySuffix.Selector,
  get: ({ get }) => {
    const wordIds = get(wordIdsState)
    const searchInput = get(searchInputState)

    if (searchInput === "") return wordIds // Return as it is, if it has no search input

    return wordIds.filter(wordId => {
      const word = get(wordsFamily(wordId))
      if (word === null) return false

      return word.term.includes(searchInput)
    })
  },
})
