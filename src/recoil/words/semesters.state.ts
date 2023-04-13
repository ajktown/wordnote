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

export const semestersState = atom<SemesterData[]>({
  key: Rkp.Semesters,
  default: [],
})

export const semesterDetailFamily = atomFamily<SemesterDetailedInfo, string>({
  key: Rkp.Semesters + Prk.Details + Rks.Family,
  default: undefined,
})

// TODO: Move this to tags state!
export const isSemesterExpandedState = atom<boolean>({
  key: Prk.SemesterExpanded,
  default: false,
})

export const deprecatedSelectedSemesterState = atom<null | number>({
  key: Prk.DeprecatedSemesterSelected,
  default: null,
})
