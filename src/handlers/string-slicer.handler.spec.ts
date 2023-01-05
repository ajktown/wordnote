import { stringSlicerHandler } from './string-slicer.handler'
// TODO: Implement the following
// TODO: 1. the Auto generation tool for TypeScript
// TODO: 1. The Coverage Test for the TypeScript
// TODO: 1. If can't be found, you may follow the exact same format as the Go supported auto generation tool (format)

describe(`stringSlicerHandler`, () => {
  it(`should expose a function`, () => {
    expect(stringSlicerHandler).toBeDefined()
  })

  interface Test {
    sampleString: string
    wantLeftOver: string
    wantParsed: string
  }

  const tests: Test[] = [
    {
      sampleString: ``,
      wantLeftOver: ``,
      wantParsed: ``,
    },
    {
      sampleString: `:`,
      wantLeftOver: ``,
      wantParsed: ``,
    },
    {
      sampleString: `:h`,
      wantLeftOver: ``,
      wantParsed: `h`,
    },
    {
      sampleString: `$:h`,
      wantLeftOver: `:h`,
      wantParsed: ``,
    },
    {
      sampleString: `$]h`,
      wantLeftOver: `]h`,
      wantParsed: ``,
    },
    {
      sampleString: `hello`,
      wantLeftOver: `hello`,
      wantParsed: ``,
    },
    {
      sampleString: `hello]world`,
      wantLeftOver: `hello`,
      wantParsed: `world`,
    },
    {
      sampleString: `hi:hello$]world`,
      wantLeftOver: `hi`,
      wantParsed: `hello]world`,
    },
    {
      sampleString: `hello:world=is the simplest code for beginners`,
      wantLeftOver: `hello`,
      wantParsed: `world=is the simplest code for beginners`,
    },
  ]

  it(`stringSlicerHandler should return the expected output`, () => {
    tests.forEach((test, i) => {
      // const [leftOver, parsed]: ParseUserInputIntoWordMicroResult = stringSlicerHandler(test.sampleString)
      // expect(leftOver).toBe(test.wantLeftOver)
      // expect(parsed).toBe(test.wantParsed)
    })
  })
})
