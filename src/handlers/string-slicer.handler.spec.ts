import { stringSlicerHandler } from './string-slicer.handler'
// TODO: Implement the following
// TODO: 1. the Auto generation tool for TypeScript
// TODO: 1. The Coverage Test for the TypeScript
// TODO: 1. If can't be found, you may follow the exact same format as the Go supported auto generation tool (format)

const PRIVATE_FINAL_ESCAPE_CHAR = `$`
const PRIVATE_FINAL_SLICE_WITH = ':'

describe(`stringSlicerHandler`, () => {
  it(`should expose a function`, () => {
    expect(stringSlicerHandler).toBeDefined()
  })

  interface Test {
    sampleString: string
    wantSlicedFront: string
    wantSlicedRear: string
  }

  const tests: Test[] = [
    {
      sampleString: "",
      wantSlicedFront: "",
      wantSlicedRear: ""
    }
    // TODO: Add more test lines here...
  ]

  it(`stringSlicerHandler should return the expected output`, () => {
    tests.forEach((test) => {
      const [slicedFront, slicedRear] = stringSlicerHandler(
        test.sampleString,
        PRIVATE_FINAL_SLICE_WITH,
        PRIVATE_FINAL_ESCAPE_CHAR,
      )
      expect(slicedFront).toBe(test.wantSlicedFront)
      expect(slicedRear).toBe(test.wantSlicedRear)
    })
  })
})
