import { GlobalLanguageCode } from '@/global.interface'
import { DataStatus } from '../index.interface'

export interface WordData extends DataStatus {
  id: string
  languageCode: GlobalLanguageCode
  isFavorite: boolean
  term: string
  pronunciation: string
  definition: string
  example: string
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
