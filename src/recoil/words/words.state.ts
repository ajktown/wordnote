import {
  WordData,
  WordDataModifiableKey,
  WordDataModifiableValue,
} from '@/api/words/interfaces'
import { atom, atomFamily, selector } from 'recoil'
import { RecoilKeySuffix } from '@/recoil/index.keys'
import { searchInputState } from './searchInput.state'
import { deprecatedSelectedSemesterState } from './semesters.state'
import { GetWordParams } from '@/api/words/interfaces/index.search-params'

enum PrivateWordRecoilKey {
  Words = `Words`,
  GetWordsParams = `getWordsParams`,
  ModifyingWords = `ModifyingWords`,
  isFavoriteClicked = `isFavoriteClicked`,
  selectedSemester = `SelectedSemester`,
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
  key: PrivateWordRecoilKey.Words + RecoilKeySuffix.Family,
  default: undefined,
})

export const modifyingWordFamily = atomFamily<
  WordDataModifiableValue | null,
  WordDataModifiableKey
>({
  key: PrivateWordRecoilKey.ModifyingWords + RecoilKeySuffix.Family,
  default: null,
})

export const selectedWordIdForDialogState = atom<null | string>({
  key: PrivateWordRecoilKey.Words + RecoilKeySuffix.Dialog,
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
  key: PrivateWordRecoilKey.isFavoriteClicked + RecoilKeySuffix.Selector,
  get: ({ get }) => {
    return !!get(getWordsParamsState).isFavorite
  },
})

export const selectedSemesterState = selector<undefined | number>({
  key: PrivateWordRecoilKey.selectedSemester + RecoilKeySuffix.Selector,
  get: ({ get }) => {
    return get(getWordsParamsState).semester
  },
})

const privateSearchInputFilteredWordIdsState = selector<string[]>({
  key:
    PrivateWordRecoilKey.SearchInputFilteredWordIds + RecoilKeySuffix.Selector,
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
  key: PrivateWordRecoilKey.SemesterFilteredWordIds + RecoilKeySuffix.Selector,
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
