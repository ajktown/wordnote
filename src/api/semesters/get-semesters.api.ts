// TODO: Implement

import { DUMMY_SEMESTERS } from './index.dummy'
import { SemesterData } from './index.interface'

export const getSemestersApi = async (): Promise<SemesterData[]> => {
  console.log(`Getting semesters from server...`)
  return DUMMY_SEMESTERS
}
