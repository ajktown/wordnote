// This is the JS approved date type that should be acceptable
type JsDateAccepter = number | string | Date

export const timeHandler = {
  // TODO: Write a test for it
  isWithinDaysAgo: (nDaysAgo: number, givenDate: JsDateAccepter) => {
    const today = new Date()
    const convertedDate = new Date(givenDate)

    const nDaysAgoInMs = nDaysAgo * 24 * 60 * 60 * 1000
    const dateNDaysAgo = new Date(today.getTime() - nDaysAgoInMs)
    return convertedDate >= dateNDaysAgo && convertedDate <= today
  },
}
