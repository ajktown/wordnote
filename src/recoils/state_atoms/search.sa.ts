import { atom, RecoilState } from "recoil"
import { AtomStateKey } from "./index.const"

export const searchInputState: RecoilState<string> = atom({
  key: AtomStateKey.SearchInput,
  default: ""
})