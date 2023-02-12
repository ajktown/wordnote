// This is the JS approved date type that should be acceptable
type JsDateAccepter = number | string | Date
const DAY_IN_MS = 24 * 60 * 60 * 1000

export const timeHandler = {
  isWithinDaysAgo: (nDaysAgo: number, givenDate: JsDateAccepter) => {
    const today = new Date()
    const convertedDate = new Date(givenDate)

    const nDaysAgoInMs = nDaysAgo * DAY_IN_MS
    const dateNDaysAgo = new Date(today.getTime() - nDaysAgoInMs)
    const startOfDate = new Date(
      dateNDaysAgo.getFullYear(),
      dateNDaysAgo.getMonth(),
      dateNDaysAgo.getDate(),
    )
    const startOfNextDayDate = new Date(startOfDate.getTime() + DAY_IN_MS)

    return startOfDate <= convertedDate && convertedDate < startOfNextDayDate
  },
}
