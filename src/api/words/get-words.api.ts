import { DUMMY_WORDS } from './words.dummy'
import { WordData } from './words.interface'

// TODO: Implement

export const getWordsApi = async (): Promise<WordData[]> => {
  console.log(`Getting words from server...`)
  return DUMMY_WORDS
}
