import { DataStatus } from "../index.interface"


export interface WordData extends DataStatus {
  id: string
  term: string
  pronunciation: string
  definition: string
  example: string
}