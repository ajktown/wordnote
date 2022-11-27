import { getWordsApi } from "@/api/words/get-words.api"
import { WordData } from "@/api/words/words.interface"
import { RecoilValueReadOnly, selector } from "recoil"
import { AtomStateKey } from "../keys.recoil"

export const wordsSelector: RecoilValueReadOnly<WordData[]> = selector({
  key: AtomStateKey.Words + "Selector",
  get: async () => {
    return getWordsApi()
  }
})