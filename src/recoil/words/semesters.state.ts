import {
  SemesterData,
  SemesterDetailedInfo,
} from '@/api/semesters/index.interface'
import { atom, atomFamily } from 'recoil'
import { Rks } from '../index.keys'

enum PrivateSemesterRecoilKey {
  Semesters = `Semesters`,
  SemesterExpanded = `SemesterExpanded`,
  DeprecatedSemesterSelected = `DeprecatedSemesterSelected`,
  LanguageSelected = `LanguageSelected`,
}

export const semestersState = atom<SemesterData[]>({
  key: PrivateSemesterRecoilKey.Semesters,
  default: [],
})

export const semesterDetailFamily = atomFamily<SemesterDetailedInfo, string>({
  key: PrivateSemesterRecoilKey.Semesters + Rks.Family,
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
