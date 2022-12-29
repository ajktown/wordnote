import { DataStatus } from '../index.interface'

export interface WordData extends DataStatus {
  id: string
  isFavorite: boolean
  term: string
  pronunciation: string
  definition: string
  example: string
}

export type WordDataModifiable = Omit<WordData, 'id'>

export type WordDataModifiableKey = keyof WordDataModifiable
