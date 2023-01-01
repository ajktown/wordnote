import { LanguageCode } from 'iso-639-1'
import { DataStatus } from '../index.interface'

export interface WordData extends DataStatus {
  id: string
  languageCode: LanguageCode
  isFavorite: boolean
  term: string
  pronunciation: string
  definition: string
  example: string
}

export type WordDataModifiable = Omit<WordData, 'id'>
export type WordDataModifiableString = Omit<
  WordDataModifiable,
  'isFavorite' | 'languageCode'
>

export type WordDataModifiableKey = keyof WordDataModifiable
export type WordDataModifiableStringKey = keyof WordDataModifiableString
