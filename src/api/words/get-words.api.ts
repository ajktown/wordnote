import { DUMMY_WORDS } from "./words.dummy"
import { WordData } from "./words.interface"

export const getWordsApi = async (): Promise<WordData[]> => {
  return DUMMY_WORDS
}