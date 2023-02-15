import { timeHandler } from './time.handler'
import { DateTime } from 'luxon'

describe(`timeHandler.getDaysAgo()`, () => {
  it(`should be exposed as a function`, () => {
    expect(timeHandler).toBeDefined()
    expect(timeHandler.getDaysAgo).toBeDefined()
  })

  interface Test {
    sampleDate: Date
    wantDaysAgo: number
  }

  const tests: Test[] = [
    {
      sampleDate: new Date(),
      wantDaysAgo: 0,
    },
    {
      sampleDate: DateTime.now().minus({ days: 1 }).toJSDate(),
      wantDaysAgo: 1,
    },
  ]

  tests.forEach((test) => {
    const gotDaysAgo = timeHandler.getDaysAgo(test.sampleDate)
    it(`should return the expected output "${test.wantDaysAgo}" from ""${test.sampleDate}""`, () => {
      expect(gotDaysAgo).toBe(test.wantDaysAgo)
    })
  })
})

describe(`timeHandler.isWithinDaysAgo()`, () => {
  it(`should be exposed as a function`, () => {
    expect(timeHandler).toBeDefined()
    expect(timeHandler.isWithinDaysAgo).toBeDefined()
  })

  interface Test {
    sampleDaysAgo: number
    sampleDate: Date
    wantIsWithin: boolean
  }

  const tests: Test[] = [
    {
      sampleDaysAgo: 0,
      sampleDate: new Date(),
      wantIsWithin: true,
    },
    {
      sampleDaysAgo: 1,
      sampleDate: new Date(),
      wantIsWithin: false,
    },
    {
      sampleDaysAgo: 1,
      sampleDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // TODO: Pretty darn hard coded. gotta use library.
      wantIsWithin: true,
    },
    {
      sampleDaysAgo: 2,
      sampleDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // TODO: Pretty darn hard coded. gotta use library.
      wantIsWithin: false,
    },
  ]

  tests.forEach((test) => {
    const gotIsWithin = timeHandler.isWithinDaysAgo(
      test.sampleDaysAgo,
      test.sampleDate,
    )
    it(`should return the expected output in boolean "${test.wantIsWithin}" from "${test.sampleDaysAgo} days ago and date "${test.sampleDate}"`, () => {
      expect(gotIsWithin).toBe(test.wantIsWithin)
    })
  })
})
