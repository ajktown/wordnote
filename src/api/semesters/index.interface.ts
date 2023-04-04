import { GlobalLanguageCode } from '@/global.interface'

export interface SemesterData {
  code: number // 221 (2022, 1st quarter)
  year: number // 2022
  quarter: number // 1 ~ 4
}

export interface SemesterDetailedInfo {
  wordsTotalCount: number
  daysAgo: number[]
  languages: GlobalLanguageCode[]
  tags: string[]
}
