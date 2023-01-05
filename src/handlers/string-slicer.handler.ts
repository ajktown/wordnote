// TODO: Write a test.

export const stringSlicerHandler = (given: string, splitWith: string | string[], escaper: string): [string, string] => {
  const convertedStringWith: string[] = Array.isArray(splitWith) ? splitWith : [splitWith]

  for (let index = given.length - 1; index >= 0; index--) {
    if (!convertedStringWith.includes(given[index])) continue

    if (index === 0) return ["", given.slice(1)]

    if (given.charAt(index - 1) !== escaper) {
      // ! Not Escaped
      return [given.slice(0, index), given.slice(index + 1)]
    }

    // ! Escaped
    given = given.slice(0, --index) + given.slice(index)
  }

  return [given, ""]
}