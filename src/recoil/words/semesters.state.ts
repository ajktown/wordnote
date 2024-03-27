import {
  ISemester,
  ISemesterDetailedInfo,
} from '@/api/semesters/index.interface'
import { atom, atomFamily } from 'recoil'
import { Rkp, Rks } from '../index.keys'

/** Private Recoil Key */
enum Prk {
  IsEveryFavoriteSelected = `IsEveryFavoriteSelected`,
  Details = `Details`,
  SemesterExpanded = `SemesterExpanded`,
  DeprecatedSemesterSelected = `DeprecatedSemesterSelected`, // TODO: Delete me
  LanguageSelected = `LanguageSelected`, // TODO: Delete me
}

// TODO: I do not understand why semestersState sometimes become undefined ...
// TODO: And therefore has set undefined as a type
export const semestersState = atom<ISemester[] | undefined>({
  key: Rkp.Semesters,
  default: [],
})

// if a chip "favorite for all" has been selected
export const isEveryFavoriteSelectedState = atom<boolean>({
  key: Rkp.Semesters + Prk.IsEveryFavoriteSelected,
  default: false,
})

export const semesterDetailsFamily = atomFamily<ISemesterDetailedInfo, number>({
  key: Rkp.Semesters + Prk.Details + Rks.Family,
  default: undefined,
})

export const isSemesterExpandedState = atom<boolean>({
  key: Prk.SemesterExpanded,
  default: false,
})

// TODO: Delete me
export const deprecatedSelectedSemesterState = atom<null | number>({
  key: Prk.DeprecatedSemesterSelected,
  default: null,
})
