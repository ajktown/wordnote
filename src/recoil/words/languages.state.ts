import { GlobalLanguageCode } from '@/global.interface'
import { atom } from 'recoil'
import { RecoilKeySuffix } from '@/recoil/index.keys'

enum PrivateLanguageRecoilKey {
  LanguageSelected = `LanguageSelected`,
  LanguagesPerSemester = `LanguagesPerSemesterState`,
}

export const selectedLanguageState = atom<null | GlobalLanguageCode>({
  key: PrivateLanguageRecoilKey.LanguageSelected,
  default: null,
})

export const languageCodesBySemesterState = atom<GlobalLanguageCode[]>({
  key: PrivateLanguageRecoilKey.LanguagesPerSemester + RecoilKeySuffix.Selector,
  default: [],
})
