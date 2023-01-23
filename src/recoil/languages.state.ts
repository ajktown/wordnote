import { GlobalLanguageCode } from '@/global.interface'
import { atom, selector } from 'recoil'
import { RecoilKeySuffix } from './index.keys'
import { semesterFilteredWordIds, wordsFamily } from './words.state'
import { PROTECTED_AVAILABLE_LANGUAGES } from '@/global.constants'

enum PrivateLanguageRecoilKey {
  LanguageSelected = `LanguageSelected`,
  LanguagesPerSemester = `LanguagesPerSemesterState`,
}

export const selectedLanguageState = atom<null | GlobalLanguageCode>({
  key: PrivateLanguageRecoilKey.LanguageSelected,
  default: null,
})

export const languageCodesBySemesterState = selector<GlobalLanguageCode[]>({
  key: PrivateLanguageRecoilKey.LanguagesPerSemester + RecoilKeySuffix.Selector,
  get: ({ get }) => {
    const wordIds = get(semesterFilteredWordIds)
    const set = new Set<GlobalLanguageCode>()

    for (const wordId of wordIds) {
      const word = get(wordsFamily(wordId))
      if (!word) continue

      set.add(word.languageCode)
    }

    return PROTECTED_AVAILABLE_LANGUAGES.filter((language) =>
      set.has(language.code),
    ).map((language) => language.code)
  },
})
