export interface ISharedResource {
  id: string
  ownerId: string
  wordId: undefined | string
}

export interface PostSharedResourceResDTO {
  postedSharedResource: ISharedResource
}

export interface PostSharedResourceReqDTO
  extends Omit<
    ISharedResource,
    | 'id' // handled by API
    | 'ownerId' // handled by API
  > {
  expireAfterSecs: undefined | number
}
