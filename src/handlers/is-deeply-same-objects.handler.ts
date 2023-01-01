import { diff } from 'deep-object-diff'

export const isDeeplySameObjectsHandler = (
  object1: object,
  object2: object,
): boolean => {
  // diff() will return the different value like the following
  // {term: 'hello', pronunciation: 'hello'}
  return JSON.stringify(diff(object1, object2)) === `{}`
}
