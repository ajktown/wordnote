import { AxiosResponse } from 'axios'

export interface DataStatus {
  isDeleted?: boolean // if undefined or false, it is considered NOT deleted.
}

export interface DataBasics {
  createdAt: string
}

export type CustomizedAxiosResponse<T> = [T, AxiosResponse<T>]
