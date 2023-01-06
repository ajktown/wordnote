import { parseInputIntoWordLambda } from './parse-input-into-word.lambda'
// TODO: Implement the following
// TODO: 1. the Auto generation tool for TypeScript
// TODO: 1. The Coverage Test for the TypeScript
// TODO: 1. If can't be found, you may follow the exact same format as the Go supported auto generation tool (format)

// TODO: Implement this test. it has not been tested yet.
describe(`parseInputIntoWordLambda`, () => {
  it(`should expose a function`, () => {
    expect(parseInputIntoWordLambda).toBeDefined()
  })

  interface Test {
    sampleString: string
    wantTerm?: string // if undefined, it is considered blank string or ""
    wantPronunciation?: string // if undefined, it is considered blank string or ""
    wantDefinition?: string // if undefined, it is considered blank string or ""
    wantExample?: string // if undefined, it is considered blank string or ""
  }

  const termsOnlyTests: Test[] = [
    {
      sampleString: ``,
    },
    {
      sampleString: `hello`,
      wantTerm: `hello`,
    },
    // TODO: Implement more test here.
  ]

  const termsPronunciationTests: Test[] = []

  const termsPronunciationDefinitionsTests: Test[] = []

  const termsPronunciationDefinitionsExamplesTests: Test[] = []

  const pronunciationOnlyTests: Test[] = []

  const pronunciationDefinitionsTests: Test[] = []

  const pronunciationTestsDefinitionsExamples: Test[] = []

  const tests: Test[] = [
    ...termsOnlyTests,
    ...termsPronunciationTests,
    ...termsPronunciationDefinitionsTests,
    ...termsPronunciationDefinitionsExamplesTests,
    ...pronunciationOnlyTests,
    ...pronunciationDefinitionsTests,
    ...pronunciationTestsDefinitionsExamples,
    // TODO: Add more testing type
  ]

  it(`parseInputIntoWordLambda should return the expected output`, () => {
    tests.forEach((test) => {
      const parsedWordData = parseInputIntoWordLambda(test.sampleString)
      expect(parsedWordData.term === (test.wantTerm || ``)).toBe(true)
      expect(
        parsedWordData.pronunciation === (test.wantPronunciation || ``),
      ).toBe(true)
      expect(parsedWordData.definition === (test.wantDefinition || ``)).toBe(
        true,
      )
      expect(parsedWordData.example === (test.wantExample || ``)).toBe(true)
    })
  })
})
