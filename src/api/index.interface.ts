import { AxiosResponse } from 'axios'

export interface DataStatus {
  isDeleted?: boolean // if undefined or false, it is considered NOT deleted.
}

export interface DataBasics {
  createdAt: string
}

export interface PaginationRootProps {
  pageIndex: number
  lastPageIndex: number
  isNextPageExist: boolean
  totalPages: number
  totalItems: number
  itemPerPage: number
}
export interface PaginationRoot {
  pagination: PaginationRootProps
}

export type CustomizedAxiosResponse<T> = [T, AxiosResponse<T>]

interface PaginationReqDTORoot {
  pageIndex: number
  itemsPerPage: number
}

export interface GetReqDtoRoot extends PaginationReqDTORoot {
  limit: number
}
