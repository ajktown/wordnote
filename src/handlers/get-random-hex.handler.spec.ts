import { getRandomHexHandler } from './get-random-hex.handler'
// TODO: Implement the following
// TODO: 1. the Auto generation tool for TypeScript
// TODO: 1. The Coverage Test for the TypeScript
// TODO: 1. If can't be found, you may follow the exact same format as the Go supported auto generation tool (format)

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
    it(`getRandomHexHandler should return the expected output with correct length from "${test.sampleHexLength}"`, () => {
      expect(getRandomHexHandler(test.sampleHexLength).length).toBe(test.wantLength)
    })
  })
})
