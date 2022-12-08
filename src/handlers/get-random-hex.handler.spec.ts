import { getRandomHexHandler } from './get-random-hex.handler'

describe(`getRandomHexHandler`, () => {
  it(`should expose a function`, () => {
    expect(getRandomHexHandler).toBeDefined()
  })

  const DEFAULT_HEX_LENGTH = 6
  interface Test {
    hexLength?: number
    wantLength: number
  }

  const tests: Test[] = [
    {
      hexLength: undefined,
      wantLength: DEFAULT_HEX_LENGTH,
    },
    {
      hexLength: 1,
      wantLength: 1,
    },
    {
      hexLength: 2,
      wantLength: 2,
    },
    {
      hexLength: 6,
      wantLength: 6,
    },
    {
      hexLength: 10,
      wantLength: 10,
    },
  ]

  it(`getRandomHexHandler should return the expected output with correct length`, () => {
    tests.forEach((test) => {
      expect(getRandomHexHandler(test.hexLength).length).toBe(test.wantLength)
    })
  })
})
