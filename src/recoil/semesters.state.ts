import { SemesterData } from '@/api/semesters/index.interface'
import { GlobalLanguageCode } from '@/global.interface'
import { atom } from 'recoil'

enum PrivateSemesterRecoilKey {
  Semesters = `Semesters`,
  SemesterExpanded = `SemesterExpanded`,
  SemesterSelected = `SemesterSelected`,
  LanguageSelected = `LanguageSelected`,
}

export const semestersState = atom<SemesterData[]>({
  key: PrivateSemesterRecoilKey.Semesters,
  default: [],
})

export const isSemesterExpandedState = atom<boolean>({
  key: PrivateSemesterRecoilKey.SemesterExpanded,
  default: false,
})

export const selectedSemesterState = atom<null | number>({
  key: PrivateSemesterRecoilKey.SemesterSelected,
  default: null,
})

// TODO: selectedLanguageState should be separated from this file, but not sure how to manage files yet
// TODO: And therefore will do so later
export const selectedLanguageState = atom<null | GlobalLanguageCode>({
  key: PrivateSemesterRecoilKey.LanguageSelected,
  default: null,
})
