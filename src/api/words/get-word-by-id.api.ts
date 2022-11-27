// TODO: Implement

import { DUMMY_WORDS } from "./words.dummy"
import { WordData } from "./words.interface"

export const getWordByIdApi = async (wordId: string): Promise<WordData> => {
  const foundIndex = DUMMY_WORDS.findIndex(el => el.id === wordId)
  if (foundIndex === -1) throw new Error()

  return DUMMY_WORDS[foundIndex]
}