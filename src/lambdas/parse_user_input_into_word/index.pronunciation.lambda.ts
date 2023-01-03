import { ParseUserInputIntoWordMicroResult, PROTECTED_FINAL_ESCAPE_CHAR } from "./index.lambda.interface"

const PRIVATE_FINAL_PRONUNCIATION_CHAR: string = "["

export const parseFromGivenInputForPronunciationLambda = (given: string): ParseUserInputIntoWordMicroResult => {
  for (let i = given.length - 1; i >= 0; i--) {
    if (given[i] !== PRIVATE_FINAL_PRONUNCIATION_CHAR) continue

    if (i === 0) return ["", given.slice(1)]

    if (given.charAt(i - 1) !== PROTECTED_FINAL_ESCAPE_CHAR) {
      // ! Not Escaped
      return [given.slice(0, i), given.slice(i + 1)]
    }

    // ! Escaped
    given = given.slice(0, i - 1) + given.slice(i)
    i = i - 1//Should remove i one more, as escaper has been deleted.
  }

  return [given, ""]
}