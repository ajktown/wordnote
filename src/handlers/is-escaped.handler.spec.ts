import { isEscapedHandler } from './is-escaped.handler'
// TODO: Implement the following
// TODO: 1. the Auto generation tool for TypeScript
// TODO: 1. The Coverage Test for the TypeScript
// TODO: 1. If can't be found, you may follow the exact same format as the Go supported auto generation tool (format)

describe(`isEscapedHandler`, () => {
  it(`should expose a function`, () => {
    expect(isEscapedHandler).toBeDefined()
  })

  interface Test {
    sampleString: string
    escaper: string | string[]
    wantResult: boolean
  }

  // TODO: Implement
  const tests: Test[] = [

  ]

  it(`isEscapedHandler should return the expected output`, () => {
    tests.forEach((test) => {
      expect(isEscapedHandler(test.sampleString, test.escaper)).toBe(test.wantResult)
    })
  })
})
