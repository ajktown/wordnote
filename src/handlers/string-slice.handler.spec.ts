import { stringSliceHandler } from './string-slicer.handler'

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
    },{
      sampleString: `$`,
      wantSlicedFront: `$`,
      wantSlicedRear: ``,
    },
    {
      sampleString: `$:`,
      wantSlicedFront: `:`,
      wantSlicedRear: ``,
    },
    {
      sampleString: `hello`,
      wantSlicedFront: `hello`,
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
      wantSlicedRear: `hello$:world`,
    },
    {
      sampleString: `new$:hello$$:world`,
      wantSlicedFront: `new:hello$:world`,
      wantSlicedRear: ``,
    },
  ]

  tests.forEach((test) => {
    const [expectSlicedFront, expectSlicedRear] = stringSliceHandler(
      test.sampleString,
      PRIVATE_FINAL_SLICE_WITH,
      PRIVATE_FINAL_ESCAPE_CHAR,
    )
    it(`should return the expected output from "${test.sampleString}"`, () => {
      expect(expectSlicedFront).toBe(test.wantSlicedFront)
      expect(expectSlicedRear).toBe(test.wantSlicedRear)
    })
  })
})
