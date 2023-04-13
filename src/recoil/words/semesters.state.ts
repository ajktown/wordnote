import {
  SemesterData,
  SemesterDetailedInfo,
} from '@/api/semesters/index.interface'
import { atom, atomFamily } from 'recoil'
import { Rks } from '../index.keys'

/** Private Recoil Key */
enum Prk {
  Semesters = `Semesters`,
  SemesterExpanded = `SemesterExpanded`,
  DeprecatedSemesterSelected = `DeprecatedSemesterSelected`,
  LanguageSelected = `LanguageSelected`,
}

export const semestersState = atom<SemesterData[]>({
  key: Prk.Semesters,
  default: [],
})

export const semesterDetailFamily = atomFamily<SemesterDetailedInfo, string>({
  key: Prk.Semesters + Rks.Family,
  default: undefined,
})

export const isSemesterExpandedState = atom<boolean>({
  key: Prk.SemesterExpanded,
  default: false,
})

export const deprecatedSelectedSemesterState = atom<null | number>({
  key: Prk.DeprecatedSemesterSelected,
  default: null,
})
