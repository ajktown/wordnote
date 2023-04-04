import {
  SemesterData,
  SemesterDetailedInfo,
} from '@/api/semesters/index.interface'
import { atom, atomFamily } from 'recoil'
import { RecoilKeySuffix } from '../index.keys'

enum PrivateSemesterRecoilKey {
  Semesters = `Semesters`,
  SemesterExpanded = `SemesterExpanded`,
  DeprecatedSemesterSelected = `SemesterSelected`,
  LanguageSelected = `LanguageSelected`,
}

export const semestersState = atom<SemesterData[]>({
  key: PrivateSemesterRecoilKey.Semesters,
  default: [],
})

export const semesterDetails = atomFamily<SemesterDetailedInfo, string>({
  key: PrivateSemesterRecoilKey.Semesters + RecoilKeySuffix.Family,
  default: undefined,
})

export const isSemesterExpandedState = atom<boolean>({
  key: PrivateSemesterRecoilKey.SemesterExpanded,
  default: false,
})

export const deprecatedSelectedSemesterState = atom<null | number>({
  key: PrivateSemesterRecoilKey.DeprecatedSemesterSelected,
  default: null,
})
