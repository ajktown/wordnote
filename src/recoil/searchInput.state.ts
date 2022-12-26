import { atom } from 'recoil'
import { RecoilKey } from './index.keys'

export const searchInputState = atom<string>({
  key: RecoilKey.SearchInput,
  default: ``,
})
