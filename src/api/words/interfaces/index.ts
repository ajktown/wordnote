import { GlobalLanguageCode } from '@/global.interface'
import { DataBasics, DataStatus } from '../../index.interface'

// TODO: Change the file name interfaces -> interface

export interface ISharedWord {
  languageCode: GlobalLanguageCode
  term: string
  pronunciation: string
  definition: string
  example: string
  exampleLink: string
  tags: string[]
}

export interface WordData extends ISharedWord, DataStatus, DataBasics {
  id: string
  userId: string
  semester: number
  isFavorite: boolean
  dateAdded?: number
  isArchived: boolean
}

export type WordDataModifiable = Omit<WordData, 'id'>
export type PostWordReqDto = Omit<
  WordData,
  | 'id' // handled by API
  | 'userId' // handled by API
  | 'languageCode' // handled by API
  | 'semester' // handled by API
  | 'dateAdded' // handled by API
  | 'isDeleted' // word cannot be deleted when it is created
  | 'createdAt' // handled by API
>
export type WordDataModifiableString = Omit<
  WordDataModifiable,
  'isFavorite' | 'languageCode'
>
export type WordDataModifiableKey = keyof WordDataModifiable
export type WordDataModifiableValue = WordDataModifiable[WordDataModifiableKey]

export type WordDataModifiableStringKey = keyof WordDataModifiableString
