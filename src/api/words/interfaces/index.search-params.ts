import { GlobalLanguageCode } from '@/global.interface'

export interface WordSearchParams {
  id: string
  languageCode: GlobalLanguageCode
  semester: number
  isFavorite: boolean
  term: string
  pronunciation: string
  definition: string
  example: string
}
