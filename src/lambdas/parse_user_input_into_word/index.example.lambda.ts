import { stringSlicerHandler } from "@/handlers/string-slicer.handler"
import { ParseUserInputIntoWordMicroResult, PROTECTED_FINAL_ESCAPE_CHAR } from "./index.lambda.interface"

const PRIVATE_FINAL_EXAMPLE_CHAR: string = "="
// TODO: Refactor this into one file
export const parseFromGivenInputForExampleLambda = (given: string): ParseUserInputIntoWordMicroResult => {
  return stringSlicerHandler(given, PRIVATE_FINAL_EXAMPLE_CHAR, PROTECTED_FINAL_ESCAPE_CHAR)
}