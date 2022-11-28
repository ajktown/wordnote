import { WordData } from '@/api/words/words.interface'
import { atom, atomFamily, selectorFamily, DefaultValue, selector } from 'recoil'
import { wordsSelector } from '../selectors/words.selector'
import { AtomStateKey, AtomStateSuffix } from '../keys.recoil'
import { getWordIdsApi } from '@/api/words/get-word-ids.api'
import { getWordByIdApi } from '@/api/words/get-word-by-id.api'

export const guardRecoilDefaultValue = (
  candidate: unknown
): candidate is DefaultValue => {
  if (candidate instanceof DefaultValue) return true;
  return false;
};


// TODO: Deprecate it
// ! Deprecated
export const deprecatedWordsState = atom<WordData[]>({
  key: AtomStateKey.Words,
  default: wordsSelector,
})

export const wordIdsSelector = selector<string[]>({
  key: AtomStateKey.Words + `Selector`,
  get: async () => {
    return getWordIdsApi()
  },
})

//** START FROM HERE */
// TODO: Rename the data later.

export const wordsAtom = atomFamily<WordData | null, string>({
  key: AtomStateKey.Words + AtomStateSuffix.Family,
  default: async (wordId: string) => {
    try {
      return await getWordByIdApi(wordId)
    } catch {
      return null
    }
  }
})

export const wordIdsState = atom<string[]>({
  key: AtomStateKey.Words + AtomStateSuffix.Ids,
  default: wordIdsSelector,
})

export const words = selectorFamily({
  key: AtomStateKey.Words + AtomStateSuffix.SelectorFamily,
  get: (wordId: string) => ({ get }) => {
    return get(wordsAtom(wordId))
  },
  set: (wordId: string) => ({ set, reset }, newWord) => {
    if (guardRecoilDefaultValue(newWord)) {
      reset(wordsAtom(wordId))
      reset(wordIdsState)
      return
    }
    set(wordsAtom(wordId), newWord)
    set(wordIdsState, prev => [wordId, ...prev])
  },
})
