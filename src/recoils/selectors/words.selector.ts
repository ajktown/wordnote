import { getWordIdsApi } from '@/api/words/get-word-ids.api'
import { selector } from 'recoil'
import { RecoilKey, RecoilKeySuffix } from '../keys.recoil'

export const wordIdsSelector = selector<string[]>({
  key: RecoilKey.Words + RecoilKeySuffix.Selector,
  get: async () => {
    return getWordIdsApi()
  },
})
