// TODO: Implement

import { WordData } from './words.interface'

export const postWordApi = async (newWord: WordData): Promise<WordData> => {
  console.log(`Posting the word...: ` + JSON.stringify(newWord))

  return newWord
}
