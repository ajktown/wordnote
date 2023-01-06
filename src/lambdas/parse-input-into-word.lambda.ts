import { WordData } from '@/api/words/words.interface'
import { getRandomHexHandler } from '@/handlers/get-random-hex.handler'
import { stringSliceHandler } from '@/handlers/string-slicer.handler'

const PRIVATE_FINAL_ESCAPE_CHAR = `$`
const PRIVATE_FINAL_EXAMPLE_CHAR = `=`
const PRIVATE_FINAL_DEFINITION_CHARS = [`:`, `]`]
const PRIVATE_FINAL_PRONUNCIATION_CHAR = `[`

// TODO: Make a test
export const parseInputIntoWordLambda = (given: string): WordData => {
  const [leftOverAfterExample, example] = stringSliceHandler(
    given,
    PRIVATE_FINAL_EXAMPLE_CHAR,
    PRIVATE_FINAL_ESCAPE_CHAR,
  )
  const [leftOverAfterDefinition, definition] = stringSliceHandler(
    leftOverAfterExample,
    PRIVATE_FINAL_DEFINITION_CHARS,
    PRIVATE_FINAL_ESCAPE_CHAR,
  )
  const [term, pronunciation] = stringSliceHandler(
    leftOverAfterDefinition,
    PRIVATE_FINAL_PRONUNCIATION_CHAR,
    PRIVATE_FINAL_ESCAPE_CHAR,
  )

  return {
    id: given + getRandomHexHandler(),
    term: term.trim(),
    pronunciation: pronunciation.trim(),
    definition: definition.trim(),
    example: example.trim(),
    isFavorite: false,
  }
}
