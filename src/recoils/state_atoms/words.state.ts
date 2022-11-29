import { WordData } from '@/api/words/words.interface'
import { atom, atomFamily, selectorFamily, DefaultValue } from 'recoil'
import { wordIdsSelector } from '../selectors/words.selector'
import { RecoilKey, RecoilKeySuffix } from '../keys.recoil'
import { getWordByIdApi } from '@/api/words/get-word-by-id.api'

export const guardRecoilDefaultValue = (
  candidate: unknown,
): candidate is DefaultValue => {
  if (candidate instanceof DefaultValue) return true
  return false
}

//** START FROM HERE */
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
