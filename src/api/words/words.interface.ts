import { DataStatus } from '../index.interface'

export interface WordData extends DataStatus {
  id: string
  isFavorite: boolean
  term: string
  pronunciation: string
  definition: string
  example: string
}

export type WordDataModifiable = Partial<Omit<WordData, 'id'>>
