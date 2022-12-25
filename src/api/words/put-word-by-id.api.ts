// TODO: Implement

import { WordDataModifiable } from './words.interface'

export const putWordByIdApi = async (
  wordId: string,
  modifying: Partial<WordDataModifiable>,
): Promise<void> => {
  console.log(
    `Putting the word: ` + wordId + ` with: ${JSON.stringify(modifying)}`,
  )
}
