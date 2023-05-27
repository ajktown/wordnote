import { AxiosResponse } from 'axios'

export interface DataStatus {
  isDeleted?: boolean // if undefined or false, it is considered NOT deleted.
}

export interface DataBasics {
  createdAt: string
}

export interface PaginationRoot {
  pageIndex: number
  lastPageIndex: number
  isNextPageExist: boolean
  totalPages: number
  totalItems: number
  itemPerPage: number
  dataLength: number
}

export type CustomizedAxiosResponse<T> = [T, AxiosResponse<T>]

export interface GetReqDtoRoot {
  limit: number
}
