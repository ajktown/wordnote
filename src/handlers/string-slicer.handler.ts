// TODO: Write a test.

export const stringSlicerHandler = (given: string, splitWith: string | string[], escaper: string): [string, string] => {
  const convertedStringWith: string[] = Array.isArray(splitWith) ? splitWith : [splitWith]

  for (let i = given.length - 1; i >= 0; i--) {
    if (!convertedStringWith.includes(given[i])) continue

    if (i === 0) return ["", given.slice(1)]

    if (given.charAt(i - 1) !== escaper) {
      // ! Not Escaped
      return [given.slice(0, i), given.slice(i + 1)]
    }

    // ! Escaped
    given = given.slice(0, i - 1) + given.slice(i)
    i = i - 1//Should remove i one more, as escaper has been deleted.
  }

  return [given, ""]
}