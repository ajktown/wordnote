import { atom, RecoilState } from 'recoil'
import { RecoilKey } from '../keys.recoil'

export const searchInputState: RecoilState<string> = atom({
  key: RecoilKey.SearchInput,
  default: ``,
})
