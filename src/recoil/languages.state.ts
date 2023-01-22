import { GlobalLanguageCode } from '@/global.interface'
import { atom, selector } from 'recoil'
import { RecoilKeySuffix } from './index.keys'
import { wordIdsState, wordsFamily } from './words.state'
import { PROTECTED_AVAILABLE_LANGUAGES } from '@/global.constants'

enum PrivateLanguageRecoilKey {
  LanguageSelected = `LanguageSelected`,
  languagesPerSemester = `languagesPerSemesterState`,
}

export const selectedLanguageState = atom<null | GlobalLanguageCode>({
  key: PrivateLanguageRecoilKey.LanguageSelected,
  default: null,
})

export const languagesPerSemesterState = selector<GlobalLanguageCode[]>({
  key: PrivateLanguageRecoilKey.languagesPerSemester + RecoilKeySuffix.Selector,
  get: ({ get }) => {
    const wordIds = get(wordIdsState)
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
