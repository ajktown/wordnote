interface SharedResource {
  id: number
  name: string
}
export interface ISharedResource {
  id: string
  ownerId: string
  resourceId: number
  resources: SharedResource[]
}

export interface PostSharedResourceResDTO {
  postedSharedResource: ISharedResource
}

export type PostSharedResourceReqDTO = Omit<
  ISharedResource,
  | 'id' // handled by API
  | 'ownerId' // handled by API
>
