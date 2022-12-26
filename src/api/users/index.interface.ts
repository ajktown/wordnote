import { DataStatus } from '../index.interface'

// No Email Addresses
// No Names
export interface UserData extends DataStatus {
  id: string
  nickname: string
}

export type UserDataModifiable = Omit<UserData, 'id'>
