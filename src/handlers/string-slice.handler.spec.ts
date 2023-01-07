import { stringSliceHandler } from './string-slicer.handler'
// TODO: Implement the following
// TODO: 1. the Auto generation tool for TypeScript
// TODO: 1. The Coverage Test for the TypeScript
// TODO: 1. If can't be found, you may follow the exact same format as the Go supported auto generation tool (format)

const PRIVATE_FINAL_ESCAPE_CHAR = `$`
const PRIVATE_FINAL_SLICE_WITH = `:`

describe(`stringSliceHandler`, () => {
  it(`should be exposed as a function`, () => {
    expect(stringSliceHandler).toBeDefined()
  })

  interface Test {
    sampleString: string
    wantSlicedFront: string
    wantSlicedRear: string
  }

  const tests: Test[] = [
    {
      sampleString: ``,
      wantSlicedFront: ``,
      wantSlicedRear: ``,
    },
    {
      sampleString: `:`,
      wantSlicedFront: ``,
      wantSlicedRear: ``,
    },
    {
      sampleString: `$:`,
      wantSlicedFront: `:`,
      wantSlicedRear: ``,
    },
    {
      sampleString: `hello:`,
      wantSlicedFront: `hello`,
      wantSlicedRear: ``,
    },
    {
      sampleString: `hello:world`,
      wantSlicedFront: `hello`,
      wantSlicedRear: `world`,
    },
    {
      sampleString: `hello$:world`,
      wantSlicedFront: `hello:world`,
      wantSlicedRear: ``,
    },
    {
      sampleString: `new:hello$:world`,
      wantSlicedFront: `new`,
      wantSlicedRear: `hello:world`,
    },
    {
      sampleString: `new:hello$$:world`,
      wantSlicedFront: `new`,
      wantSlicedRear: `hello:world$`,
    },
  ]

  it(`stringSliceHandler should return the expected output`, () => {
    tests.forEach((test) => {
      const [slicedFront, slicedRear] = stringSliceHandler(
        test.sampleString,
        PRIVATE_FINAL_SLICE_WITH,
        PRIVATE_FINAL_ESCAPE_CHAR,
      )
      expect(slicedFront).toBe(test.wantSlicedFront)
      expect(slicedRear).toBe(test.wantSlicedRear)
    })
  })
})
