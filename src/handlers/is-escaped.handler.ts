

type Escapers = string | string[]

// TODO: This requires test
// TODO: I am not sure yet this handler works properly yet.
export const isEscapedHandler = (given: string, escapers: Escapers): boolean => {
  if (given.length < 1) return false

  const escaperArr: string[] = Array.isArray(escapers) ? escapers : [escapers]
  return escaperArr.includes(given[0])
}