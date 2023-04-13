import { Rkp, Rks } from '@/recoil/index.keys'
import { selector } from 'recoil'
import { getWordsParamsState } from './words.state'
import { GlobalLanguageCode } from '@/global.interface'

/** Private Recoil Key */
enum Prk {
  SelectedSemester = `SelectedSemester`,
  SelectedCustomized = `SelectedCustomized`,
  SelectedLanguage = `SelectedLanguage`,
  SelectedDaysAgo = `SelectedDaysAgo`,
}

export const selectedSemesterSelector = selector<undefined | number>({
  key: Rkp.Tags + Prk.SelectedSemester + Rks.Selector,
  get: ({ get }) => {
    return get(getWordsParamsState).semester
  },
})

export const selectedCustomizedTagsSelector = selector<string[]>({
  key: Rkp.Tags + Prk.SelectedCustomized + Rks.Selector,
  get: ({ get }) => {
    return get(getWordsParamsState).tags || []
  },
})

export const selectedLanguageTagsSelector = selector<GlobalLanguageCode[]>({
  key: Rkp.Tags + Prk.SelectedLanguage + Rks.Selector,
  get: ({ get }) => {
    return get(getWordsParamsState).languageCodes || []
  },
})

export const selectedDaysAgoTagsSelector = selector<undefined | number>({
  key: Rkp.Tags + Prk.SelectedDaysAgo + Rks.Selector,
  get: ({ get }) => {
    return get(getWordsParamsState).daysAgo
  },
})
