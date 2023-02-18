export interface DataStatus {
  isDeleted?: boolean // if undefined or false, it is considered NOT deleted.
}

export interface DataBasics {
  createdAt: string
}
