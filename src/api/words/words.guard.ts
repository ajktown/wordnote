import { WordData } from "./words.interface"

export const isWordData = (object: unknown): object is WordData => {
  if (!object || typeof object !== "object") return false

  // TODO: More type guard operator?
  return true
}