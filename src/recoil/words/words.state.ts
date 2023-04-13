import {
  WordData,
  WordDataModifiableKey,
  WordDataModifiableValue,
} from '@/api/words/interfaces'
import { atom, atomFamily, selector } from 'recoil'
import { Rks } from '@/recoil/index.keys'
import { searchInputState } from './searchInput.state'
import { deprecatedSelectedSemesterState } from './semesters.state'
import { GetWordParams } from '@/api/words/interfaces/index.search-params'
import { GlobalLanguageCode } from '@/global.interface'

enum PrivateWordRecoilKey {
  Words = `Words`,
  GetWordsParams = `getWordsParams`,
  ModifyingWords = `ModifyingWords`,
  isFavoriteClicked = `isFavoriteClicked`,
  selectedSemester = `SelectedSemester`,
  SelectedDaysAgo = `SelectedDaysAgo`,
  SelectedLanguages = `SelectedLanguages`,
  SelectedTags = `SelectedTags`,
  WordIds = `WordIds`,
  SearchInputFilteredWordIds = `searchInputFilteredWordIds`,
  LanguageFilteredWordIds = `LanguageFilterWordIds`,
  SemesterFilteredWordIds = `SemesterFilteredWordIds`,
  TempLikedWordIds = `TempLikedWordIds`,
  LikedWordIds = `LikedWordIds`,
  CustomizedTagFilteredWordIds = `CustomizedTagFilteredWordIds`,
  CreatedDaysFilteredWordIds = `CreatedDaysFilteredWordIds`,
  FilteredWordIds = `FilteredWordIds`,
}

type PrivateWordsFamily =
  | undefined // not loaded
  | null // loaded, but not found
  | WordData
export const wordsFamily = atomFamily<PrivateWordsFamily, string>({
  key: PrivateWordRecoilKey.Words + Rks.Family,
  default: undefined,
})

export const modifyingWordFamily = atomFamily<
  WordDataModifiableValue | null,
  WordDataModifiableKey
>({
  key: PrivateWordRecoilKey.ModifyingWords + Rks.Family,
  default: null,
})

export const selectedWordIdForDialogState = atom<null | string>({
  key: PrivateWordRecoilKey.Words + Rks.Dialog,
  default: null, // nothing selected
})

export const wordIdsState = atom<string[]>({
  key: PrivateWordRecoilKey.WordIds,
  default: [],
})

export const getWordsParamsState = atom<Partial<GetWordParams>>({
  key: PrivateWordRecoilKey.GetWordsParams,
  default: {},
})

export const isFavoriteClickedSelector = selector<boolean>({
  key: PrivateWordRecoilKey.isFavoriteClicked + Rks.Selector,
  get: ({ get }) => {
    return !!get(getWordsParamsState).isFavorite
  },
})

export const selectedSemesterState = selector<undefined | number>({
  key: PrivateWordRecoilKey.selectedSemester + Rks.Selector,
  get: ({ get }) => {
    return get(getWordsParamsState).semester
  },
})

export const selectedDaysAgoState = selector<undefined | number>({
  key: PrivateWordRecoilKey.SelectedDaysAgo + Rks.Selector,
  get: ({ get }) => {
    return get(getWordsParamsState).daysAgo
  },
})

export const selectedLanguagesState = selector<GlobalLanguageCode[]>({
  key: PrivateWordRecoilKey.SelectedLanguages + Rks.Selector,
  get: ({ get }) => {
    return get(getWordsParamsState).languageCodes || []
  },
})

export const selectedTagsState = selector<string[]>({
  key: PrivateWordRecoilKey.SelectedTags + Rks.Selector,
  get: ({ get }) => {
    return get(getWordsParamsState).tags || []
  },
})

const privateSearchInputFilteredWordIdsState = selector<string[]>({
  key:
    PrivateWordRecoilKey.SearchInputFilteredWordIds + Rks.Selector,
  get: ({ get }) => {
    const wordIds = get(wordIdsState)
    const searchInput = get(searchInputState)

    if (!searchInput) return wordIds

    return wordIds.filter((wordId) => {
      const word = get(wordsFamily(wordId))
      if (word == null) return false

      return word.term.includes(searchInput)
    })
  },
})

export const semesterFilteredWordIds = selector<string[]>({
  key: PrivateWordRecoilKey.SemesterFilteredWordIds + Rks.Selector,
  get: ({ get }) => {
    const wordIds = get(privateSearchInputFilteredWordIdsState)

    const selectedSemester = get(deprecatedSelectedSemesterState)
    return wordIds.filter((wordId) => {
      const word = get(wordsFamily(wordId))
      if (!word) return false

      if (selectedSemester === null) return true
      return word.semester === selectedSemester
    })
  },
})

export const tempFavoriteWordIdsState = atom<string[]>({
  key: PrivateWordRecoilKey.TempLikedWordIds,
  default: [],
})
