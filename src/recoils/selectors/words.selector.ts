import { getWordIdsApi } from '@/api/words/get-word-ids.api'
import { selector } from 'recoil'
import { AtomStateKey, AtomStateSuffix } from '../keys.recoil'

export const wordIdsSelector = selector<string[]>({
  key: AtomStateKey.Words + AtomStateSuffix.Selector,
  get: async () => {
    return getWordIdsApi()
  },
})
