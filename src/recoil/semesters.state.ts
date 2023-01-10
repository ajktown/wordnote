import { SemesterData } from '@/api/semesters/index.interface'
import { atom } from 'recoil'

enum PrivateSemesterRecoilKey {
  Semesters = `Semesters`,
  SemesterSelected = `SemesterSelected`,
}

export const semestersState = atom<SemesterData[]>({
  key: PrivateSemesterRecoilKey.Semesters,
  default: [],
})

export const selectedSemester = atom<null | number>({
  key: PrivateSemesterRecoilKey.SemesterSelected,
  default: null,
})
