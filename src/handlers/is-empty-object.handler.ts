export const isEmptyObjectHandler = (
  object1: object,
): boolean => {
  return JSON.stringify(object1) === `{}`
}
