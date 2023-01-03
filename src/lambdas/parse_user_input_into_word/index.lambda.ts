import { WordData } from "@/api/words/words.interface"
import { getRandomHexHandler } from "@/handlers/get-random-hex.handler"
import { parseFromGivenInputForDefinitionLambda } from "./index.definition.lambda"
import { parseFromGivenInputForExampleLambda } from "./index.example.lambda"
import { parseFromGivenInputForPronunciationLambda } from "./index.pronunciation.lambda"

// TODO: Make a test
export const parseFromGivenInputLambda = (given: string): WordData => {
  const [leftOverAfterExample, example] = parseFromGivenInputForExampleLambda(given)
  const [leftOverAfterDefinition, definition] = parseFromGivenInputForDefinitionLambda(leftOverAfterExample)
  const [term, pronunciation] = parseFromGivenInputForPronunciationLambda(leftOverAfterDefinition)

  return {
    id: given + getRandomHexHandler(),
    term,
    pronunciation,
    definition,
    example,
    isFavorite: false,
  }
}