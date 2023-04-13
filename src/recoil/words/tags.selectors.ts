import { Rkp, Rks } from '@/recoil/index.keys'
import { selector } from 'recoil'
import { getWordsParamsState } from './words.state'
import { GlobalLanguageCode } from '@/global.interface'

/** Private Recoil Key */
enum Prk {
  SelectedTags = `SelectedTags`,
  SelectedLanguage = `SelectedLanguage`,
}

export const selectedTagsSelector = selector<string[]>({
  key: Rkp.Tags + Prk.SelectedTags + Rks.Selector,
  get: ({ get }) => {
    return get(getWordsParamsState).tags || []
  },
})

export const selectedLanguagesSelector = selector<GlobalLanguageCode[]>({
  key: Rkp.Tags + Prk.SelectedLanguage + Rks.Selector,
  get: ({ get }) => {
    return get(getWordsParamsState).languageCodes || []
  },
})
