import { WordData } from "@/api/words/words.interface"
import { atom, RecoilState } from "recoil"
import { wordsSelector } from "../selectors/words.selector"
import { AtomStateKey } from "../keys.recoil"

export const wordsState: RecoilState<WordData[]> = atom({
  key: AtomStateKey.Words,
  default: wordsSelector,
})