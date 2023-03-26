import { WordData } from './interfaces'

export const isWordData = (object: unknown): object is WordData => {
  if (!object || typeof object !== `object`) return false

  // TODO: More type guard operator?
  return true
}

// TODO: What is this? Remove this or use it.
