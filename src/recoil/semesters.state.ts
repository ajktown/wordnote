import { atom } from 'recoil'

enum PrivateSemesterRecoilKey {
  Semesters = `Semesters`,
  SemesterSelected = `SemesterSelected`,
}

export const semestersState = atom<string[]>({
  key: PrivateSemesterRecoilKey.Semesters,
  default: [],
})

export const selectedSemester = atom<null | string>({
  key: PrivateSemesterRecoilKey.SemesterSelected,
  default: null,
})
