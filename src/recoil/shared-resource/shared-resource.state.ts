import { atom } from 'recoil'
import { Rkp } from '@/recoil/index.keys'

/** Private Recoil Key */
enum Prk {
  SharedWordId = `SharedWordId`,
}

/**
 * The modal will appear if it is set non empty
 */
export const sharedWordIdState = atom<string>({
  key: Rkp.SharedResource + Prk.SharedWordId,
  default: ``,
})
