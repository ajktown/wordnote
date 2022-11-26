// TODO: Implement

import { WordData } from './words.interface'

export const putWordByIdApi = async (
  wordId: string,
  modifying: Partial<Exclude<WordData, 'id'>>,
): Promise<void> => {
  console.log(`Putting the word: ` + wordId + `with: ${modifying}`)
}
