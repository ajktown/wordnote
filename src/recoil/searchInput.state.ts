import { atom, RecoilState } from 'recoil'
import { RecoilKey } from './index.keys'

export const searchInputState: RecoilState<string> = atom({
  key: RecoilKey.SearchInput,
  default: ``,
})
