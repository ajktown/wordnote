import { diff } from 'deep-object-diff';

export const isDeeplySameObjectsHandler = (
  object1: Object,
  object2: Object,
): boolean => {
  // diff() will return the different value like the following
  // {term: 'hello', pronunciation: 'hello'}
  return JSON.stringify(diff(object1, object2)) === "{}"
}