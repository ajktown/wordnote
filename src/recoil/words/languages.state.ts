import { GlobalLanguageCode } from '@/global.interface'
import { atom } from 'recoil'
import { RecoilKeySuffix } from '@/recoil/index.keys'

enum PrivateLanguageRecoilKey {
  LanguagesPerSemester = `LanguagesPerSemesterState`,
}

export const languageCodesBySemesterState = atom<GlobalLanguageCode[]>({
  key: PrivateLanguageRecoilKey.LanguagesPerSemester + RecoilKeySuffix.Selector,
  default: [],
})
