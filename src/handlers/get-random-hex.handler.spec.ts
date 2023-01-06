import { getRandomHexHandler } from './get-random-hex.handler'
// TODO: Implement the following
// TODO: 1. the Auto generation tool for TypeScript
// TODO: 1. The Coverage Test for the TypeScript
// TODO: 1. If can't be found, you may follow the exact same format as the Go supported auto generation tool (format)

describe(`getRandomHexHandler`, () => {
  it(`should expose a function`, () => {
    expect(getRandomHexHandler).toBeDefined()
  })

  const DEFAULT_HEX_LENGTH = 6
  interface Test {
    hexLength: undefined | number
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
