import { atom, RecoilState } from "recoil"
import { AtomStateKey } from "../keys.recoil"

export const searchInputState: RecoilState<string> = atom({
  key: AtomStateKey.SearchInput,
  default: ""
})