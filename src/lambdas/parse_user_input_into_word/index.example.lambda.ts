import { isEscapedHandler } from "@/handlers/is-escaped.handler"
import { ParseUserInputIntoWordMicroResult, PROTECTED_FINAL_ESCAPE_CHAR } from "./index.lambda.interface"

const PRIVATE_FINAL_EXAMPLE_CHAR: string = "="

export const parseFromGivenInputForExampleLambda = (given: string): ParseUserInputIntoWordMicroResult => {
  for (let i = given.length; i >= 0; i--) {
    if (given[i] !== PRIVATE_FINAL_EXAMPLE_CHAR) continue

    if (!isEscapedHandler(given.slice(i - 1), PROTECTED_FINAL_ESCAPE_CHAR)) {
      // ! Not Escaped
      return [given.slice(0, i), given.slice(i + 1)]
    }

    // ! Escaped
    given = given.slice(0, i - 1) + given.slice(i)
  }

  return [given, ""]
}