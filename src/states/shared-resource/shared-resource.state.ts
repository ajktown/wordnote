import { atomFamily } from 'recoil'
import { Rkp, Rks } from '@/states/index.keys'
import { GetSharedResourceRes } from '@/api/shared-resources/get-shared-resource.api'
import { atomWithReset } from 'jotai/utils'

/** Private Recoil Key */
enum Prk {
  SharedWordId = `SharedWordId`,
  SharedWord = `SharedWord`,
}

/**
 * The modal will appear if it is set non empty
 */
export const sharedWordIdState = atomWithReset<string>(``)

type SharedWordFamily =
  | undefined // not requested (loading)
  | null // loaded, but not exist
  | GetSharedResourceRes

export const sharedWordFamily = atomFamily<SharedWordFamily, string>({
  key: Rkp.SharedResource + Prk.SharedWord + Rks.Family,
  default: undefined,
})
