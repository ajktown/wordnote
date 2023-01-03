import { WordData } from "@/api/words/words.interface"
import { getRandomHexHandler } from "@/handlers/get-random-hex.handler"
import { parseFromGivenInputForDefinitionLambda } from "./index.definition.lambda"
import { parseFromGivenInputForExampleLambda } from "./index.example.lambda"

export const parseFromGivenInputLambda = (given: string): WordData => {
  const [leftOverA, example] = parseFromGivenInputForExampleLambda(given)
  const [term, definition] = parseFromGivenInputForDefinitionLambda(leftOverA)

  return {
    id: given + getRandomHexHandler(),
    term,
    pronunciation: ``,
    definition,
    example,
    isFavorite: false,
  }
}