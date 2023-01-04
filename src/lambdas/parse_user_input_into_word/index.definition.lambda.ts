import { stringSlicerHandler } from "@/handlers/string-slicer.handler"
import { ParseUserInputIntoWordMicroResult, PROTECTED_FINAL_ESCAPE_CHAR } from "./index.lambda.interface"

const PRIVATE_FINAL_DEF_1_CHAR: string = ":"
const PRIVATE_FINAL_DEF_2_CHAR: string = "]"
const PRIVATE_CHARS_ARR = [
  PRIVATE_FINAL_DEF_1_CHAR,
  PRIVATE_FINAL_DEF_2_CHAR,
]
// TODO: Refactor this into one file
export const parseFromGivenInputForDefinitionLambda = (given: string): ParseUserInputIntoWordMicroResult => {
  return stringSlicerHandler(given, PRIVATE_CHARS_ARR, PROTECTED_FINAL_ESCAPE_CHAR)
}