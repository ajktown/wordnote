// TODO: Implement

import { WordData } from './words.interface'

export const postWordApi = async (newWord: WordData): Promise<void> => {
  console.log(`Posting the word...: ` + JSON.stringify(newWord))
}
