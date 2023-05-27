import {
  SemesterData,
  SemesterDetailedInfo,
} from '@/api/semesters/index.interface'
import { atom, atomFamily } from 'recoil'
import { Rkp, Rks } from '../index.keys'

/** Private Recoil Key */
enum Prk {
  Details = `Details`,
  SemesterExpanded = `SemesterExpanded`,
  DeprecatedSemesterSelected = `DeprecatedSemesterSelected`,
  LanguageSelected = `LanguageSelected`,
}

// TODO: I do not understand why semestersState sometimes become undefined ...
// TODO: And therefore has set undefined as a type
export const semestersState = atom<SemesterData[] | undefined>({
  key: Rkp.Semesters,
  default: [],
})

export const semesterDetailsFamily = atomFamily<SemesterDetailedInfo, number>({
  key: Rkp.Semesters + Prk.Details + Rks.Family,
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
