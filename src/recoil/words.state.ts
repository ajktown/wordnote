import { WordData } from '@/api/words/words.interface'
import { atom, atomFamily, selectorFamily, selector } from 'recoil'
import { getWordByIdApi } from '@/api/words/get-word-by-id.api'
import { RecoilKey, RecoilKeySuffix } from './index.keys'
import { getWordIdsApi } from '@/api/words/get-word-ids.api'
import { guardRecoilDefaultValue } from './index.guard'

// TODO: Rename the data later.

export const wordsFamily = atomFamily<WordData | null, string>({
  key: RecoilKey.Words + RecoilKeySuffix.Family,
  default: async (wordId: string) => {
    try {
      return await getWordByIdApi(wordId)
    } catch {
      return null
    }
  },
})

export const wordIdsSelector = selector<string[]>({
  key: RecoilKey.Words + RecoilKeySuffix.Selector,
  get: async () => {
    return getWordIdsApi()
  },
})

export const wordIdsState = atom<string[]>({
  key: RecoilKey.Words + RecoilKeySuffix.Ids,
  default: wordIdsSelector,
})

export const wordsSelectorFamily = selectorFamily({
  key: RecoilKey.Words + RecoilKeySuffix.SelectorFamily,
  get:
    (wordId: string) =>
    ({ get }) => {
      return get(wordsFamily(wordId))
    },
  set:
    (wordId: string) =>
    ({ set, reset }, newWord) => {
      if (guardRecoilDefaultValue(newWord)) {
        reset(wordsFamily(wordId))
        reset(wordIdsState)
        return
      }
      set(wordsFamily(wordId), newWord)
      set(wordIdsState, (prev) => [wordId, ...prev])
    },
})
