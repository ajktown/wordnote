import {
  WordData,
  WordDataModifiableKey,
  WordDataModifiableValue,
} from '@/api/words/words.interface'
import { atom, atomFamily, selector } from 'recoil'
import { isFavoriteClickedState } from './favorites.state'
import { RecoilKeySuffix } from './index.keys'
import { selectedLanguageState } from './languages.state'
import { searchInputState } from './searchInput.state'
import { selectedSemesterState } from './semesters.state'
import { selectedCustomizedTagsState } from './tags.state'

enum PrivateWordRecoilKey {
  Words = `Words`,
  ModifyingWords = `ModifyingWords`,
  WordIds = `WordIds`,
  SearchInputFilteredWordIds = `searchInputFilteredWordIds`,
  LanguageFilteredWordIds = `LanguageFilterWordIds`,
  SemesterFilteredWordIds = `SemesterFilteredWordIds`,
  TempLikedWordIds = `TempLikedWordIds`,
  LikedWordIds = `LikedWordIds`,
  CustomizedTagFilteredWordIds = `CustomizedTagFilteredWordIds`,
  FilteredWordIds = `FilteredWordIds`,
}

export const wordsFamily = atomFamily<WordData | null, string>({
  key: PrivateWordRecoilKey.Words + RecoilKeySuffix.Family,
  default: null,
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

const privateSearchInputFilteredWordIdsState = selector<string[]>({
  key:
    PrivateWordRecoilKey.SearchInputFilteredWordIds + RecoilKeySuffix.Selector,
  get: ({ get }) => {
    const wordIds = get(wordIdsState)
    const searchInput = get(searchInputState)

    if (!searchInput) return wordIds

    return wordIds.filter((wordId) => {
      const word = get(wordsFamily(wordId))
      if (word === null) return false

      return word.term.includes(searchInput)
    })
  },
})

export const semesterFilteredWordIds = selector<string[]>({
  key: PrivateWordRecoilKey.SemesterFilteredWordIds + RecoilKeySuffix.Selector,
  get: ({ get }) => {
    const wordIds = get(privateSearchInputFilteredWordIdsState)

    const selectedSemester = get(selectedSemesterState)
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

const privateLikedWordIds = selector<string[]>({
  key: PrivateWordRecoilKey.TempLikedWordIds + RecoilKeySuffix.Selector,
  get: ({ get }) => {
    const wordIds = get(semesterFilteredWordIds)

    const isFavoriteClicked = get(isFavoriteClickedState)
    if (!isFavoriteClicked) return wordIds

    return wordIds.filter((wordId) => {
      const word = get(wordsFamily(wordId))
      if (!word) return false

      return get(tempFavoriteWordIdsState).includes(word.id) || word.isFavorite
    })
  },
})

const privateLanguageFilteredWordIds = selector<string[]>({
  key: PrivateWordRecoilKey.LanguageFilteredWordIds + RecoilKeySuffix.Selector,
  get: ({ get }) => {
    const wordIds = get(privateLikedWordIds)

    const selectedLanguage = get(selectedLanguageState)
    if (!selectedLanguage) return wordIds

    return wordIds.filter((wordId) => {
      const word = get(wordsFamily(wordId))
      if (!word) return false

      return word.languageCode === selectedLanguage
    })
  },
})

const privateCustomizedTagFilteredWordIds = selector<string[]>({
  key:
    PrivateWordRecoilKey.CustomizedTagFilteredWordIds +
    RecoilKeySuffix.Selector,
  get: ({ get }) => {
    const wordIds = get(privateLanguageFilteredWordIds)
    const selectedCustomizedTags = get(selectedCustomizedTagsState)
    if (selectedCustomizedTags.length === 0) return wordIds

    return wordIds.filter((wordId) => {
      const word = get(wordsFamily(wordId))
      if (!word) return false

      for (const tag of word.tags) {
        if (selectedCustomizedTags.includes(tag)) return true
      }
      return false
    })
  },
})

export const filteredWordIdsState = selector<string[]>({
  key: PrivateWordRecoilKey.FilteredWordIds + RecoilKeySuffix.Selector,
  get: ({ get }) => {
    const wordIds = get(privateCustomizedTagFilteredWordIds)
    return wordIds
  },
})
