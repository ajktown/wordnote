import { GetReqDtoRoot } from '@/api/index.interface'
import { GlobalLanguageCode } from '@/global.interface'

export interface GetWordParams extends GetReqDtoRoot {
  id: string
  languageCode: GlobalLanguageCode
  semester: number
  isFavorite: boolean
  term: string
  pronunciation: string
  definition: string
  example: string
}
