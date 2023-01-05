import { parseFromGivenInputLambda } from './parse-user-input-into-word.lambda'
// TODO: Implement the following
// TODO: 1. the Auto generation tool for TypeScript
// TODO: 1. The Coverage Test for the TypeScript
// TODO: 1. If can't be found, you may follow the exact same format as the Go supported auto generation tool (format)

// TODO: Implement this test. it has not been tested yet.
describe(`parseFromGivenInputLambda`, () => {
  it(`should expose a function`, () => {
    expect(parseFromGivenInputLambda).toBeDefined()
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

  it(`parseFromGivenInputLambda should return the expected output`, () => {
    tests.forEach((test, i) => {
      // const [leftOver, parsed]: ParseUserInputIntoWordMicroResult = parseFromGivenInputForDefinitionLambda(test.sampleString)
      // expect(leftOver).toBe(test.wantLeftOver)
      // expect(parsed).toBe(test.wantParsed)
    })
  })
})
