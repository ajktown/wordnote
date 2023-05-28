import { AxiosResponse } from 'axios'

export interface DataStatus {
  isDeleted?: boolean // if undefined or false, it is considered NOT deleted.
}

export interface DataBasics {
  createdAt: string
}

interface PrivatePaginationProps {
  pageIndex: number
  lastPageIndex: number
  isNextPageExist: boolean
  totalPages: number
  totalItems: number
  itemPerPage: number
}
export interface PaginationRoot {
  pagination: PrivatePaginationProps
  dataLength: number
}

export type CustomizedAxiosResponse<T> = [T, AxiosResponse<T>]

export interface GetReqDtoRoot {
  limit: number
}
