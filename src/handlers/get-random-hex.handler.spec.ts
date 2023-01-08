import { getRandomHexHandler } from './get-random-hex.handler'

describe(`getRandomHexHandler`, () => {
  it(`should be exposed as a function`, () => {
    expect(getRandomHexHandler).toBeDefined()
  })

  const DEFAULT_HEX_LENGTH = 6
  interface Test {
    sampleHexLength: undefined | number
    wantLength: number
  }

  const tests: Test[] = [
    {
      sampleHexLength: undefined,
      wantLength: DEFAULT_HEX_LENGTH,
    },
    {
      sampleHexLength: 1,
      wantLength: 1,
    },
    {
      sampleHexLength: 2,
      wantLength: 2,
    },
    {
      sampleHexLength: 6,
      wantLength: 6,
    },
    {
      sampleHexLength: 10,
      wantLength: 10,
    },
  ]

  tests.forEach((test) => {
    const expectLength = getRandomHexHandler(test.sampleHexLength).length
    it(`getRandomHexHandler should return the expected output with correct length from "${test.sampleHexLength}"`, () => {
      expect(expectLength).toBe(test.wantLength)
    })
  })
})
