import { Rkp, Rks } from '@/recoil/index.keys'
import { selector } from 'recoil'
import { getWordsParamsState } from './words.state'

/** Private Recoil Key */
enum Prk {
  SelectedTags = `SelectedTags`,
}

export const selectedTagsSelector = selector<string[]>({
  key: Rkp.Tags + Prk.SelectedTags + Rks.Selector,
  get: ({ get }) => {
    return get(getWordsParamsState).tags || []
  },
})
