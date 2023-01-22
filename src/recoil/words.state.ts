import {
  WordData,
  WordDataModifiableKey,
  WordDataModifiableValue,
} from '@/api/words/words.interface'
import { atom, atomFamily, selector } from 'recoil'
import { RecoilKeySuffix } from './index.keys'
import { searchInputState } from './searchInput.state'
import { selectedLanguageState, selectedSemesterState } from './semesters.state'

enum PrivateWordRecoilKey {
  Words = `Words`,
  WordIds = `WordIds`,
  SearchInputFilteredWordIds = `searchInputFilteredWordIds`,
  LanguageFilteredWordIds = `LanguageFilterWordIds`,
  FilteredWordIds = `FilteredWordIds`,
}

export const wordsFamily = atomFamily<WordData | null, string>({
  key: PrivateWordRecoilKey.Words + RecoilKeySuffix.Family,
  default: null,
})

export const wordIdsState = atom<string[]>({
  key: PrivateWordRecoilKey.WordIds,
  default: [],
})

// TODO: Refactor this two data into a better format
export const modifyingWordFamily = atomFamily<
  WordDataModifiableValue | null,
  WordDataModifiableKey
>({
  key: PrivateWordRecoilKey.Words + RecoilKeySuffix.Family,
  default: null,
})

export const selectedWordIdForDialogState = atom<null | string>({
  key: PrivateWordRecoilKey.Words + RecoilKeySuffix.Dialog,
  default: null, // nothing selected
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

const privateLanguageFilteredWordIds = selector<string[]>({
  key: PrivateWordRecoilKey.LanguageFilteredWordIds + RecoilKeySuffix.Selector,
  get: ({ get }) => {
    const wordIds = get(privateSearchInputFilteredWordIdsState)

    const selectedLanguage = get(selectedLanguageState)
    if (!selectedLanguage) return wordIds

    return wordIds.filter((wordId) => {
      const word = get(wordsFamily(wordId))
      if (!word) return false

      return word.languageCode === selectedLanguage
    })
  },
})

export const filteredWordIdsState = selector<string[]>({
  key: PrivateWordRecoilKey.FilteredWordIds + RecoilKeySuffix.Selector,
  get: ({ get }) => {
    const wordIds = get(privateLanguageFilteredWordIds)

    const selectedSemester = get(selectedSemesterState)
    return wordIds.filter((wordId) => {
      const word = get(wordsFamily(wordId))
      if (!word) return false

      if (selectedSemester === null) return true
      return word.semester === selectedSemester
    })
  },
})
