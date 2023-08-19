import { GlobalLanguageCode } from '@/global.interface'
import { DataBasics, DataStatus } from '../../index.interface'

// TODO: Change the file name interfaces -> interface

export interface WordData extends DataStatus, DataBasics {
  id: string
  userId: string
  languageCode: GlobalLanguageCode
  semester: number
  isFavorite: boolean
  term: string
  pronunciation: string
  definition: string
  example: string
  exampleLink: string
  tags: string[]
  dateAdded?: number
}

export interface PostWordReqDto {
  languageCode: GlobalLanguageCode
  isFavorite: boolean
  term: string
  pronunciation: string
  definition: string
  example: string
  exampleLink: string
  tags: string[]
}

export type WordDataModifiable = Omit<WordData, 'id'>
export type WordDataModifiableString = Omit<
  WordDataModifiable,
  'isFavorite' | 'languageCode'
>
export type WordDataModifiableKey = keyof WordDataModifiable
export type WordDataModifiableValue = WordDataModifiable[WordDataModifiableKey]

export type WordDataModifiableStringKey = keyof WordDataModifiableString
