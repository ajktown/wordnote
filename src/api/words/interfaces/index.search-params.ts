import { GetReqDtoRoot } from '@/api/index.interface'
import { GlobalLanguageCode } from '@/global.interface'

export interface GetWordParams extends GetReqDtoRoot {
  searchInput: string
  id: string
  languageCode: GlobalLanguageCode
  languageCodes: GlobalLanguageCode[]
  semester: number
  isFavorite: boolean
  isPinned: boolean
  term: string
  pronunciation: string
  definition: string
  example: string
  daysAgo: number
  tags: string[]
}
