import { parseInputIntoWordLambda } from './parse-input-into-word.lambda'

describe(`parseInputIntoWordLambda`, () => {
  it(`should be exposed as a function`, () => {
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
    {
      sampleString: `hello:`,
      wantTerm: `hello`,
    },
    {
      sampleString: `hello=`,
      wantTerm: `hello`,
    },
    {
      sampleString: `hello]`,
      wantTerm: `hello`,
    },
    {
      sampleString: `hello[`,
      wantTerm: `hello`,
    },
    {
      sampleString: `hello  [`,
      wantTerm: `hello`,
    },
    {
      sampleString: `hello[ `,
      wantTerm: `hello`,
    },
  ]

  const termsPronunciationTests: Test[] = [
    {
      sampleString: `world  ]`,
      wantTerm: `world`,
      wantPronunciation: ``,
    },
    {
      sampleString: `[world  `,
      wantTerm: ``,
      wantPronunciation: `world`,
    },
    {
      sampleString: `hello[world`,
      wantTerm: `hello`,
      wantPronunciation: `world`,
    },
    {
      sampleString: `hello[world]`,
      wantTerm: `hello`,
      wantPronunciation: `world`,
    },
    {
      sampleString: `hello[  world]`,
      wantTerm: `hello`,
      wantPronunciation: `world`,
    },
    {
      sampleString: `hello[world  ]`,
      wantTerm: `hello`,
      wantPronunciation: `world`,
    },
  ]

  const termsPronunciationDefinitionTests: Test[] = [
    {
      sampleString: `]`,
      wantDefinition: ``,
    },
    {
      sampleString: `]world`,
      wantDefinition: `world`,
    },
  ]

  const termsPronunciationDefinitionExampleTests: Test[] = [
    {
      sampleString: `hello[hallo] world = the first sentence hello world`,
      wantTerm: `hello`,
      wantPronunciation: `hallo`,
      wantDefinition: `world`,
      wantExample: `the first sentence hello world`,
    },
  ]

  const pronunciationOnlyTests: Test[] = [
    {
      sampleString: `[]`,
      wantPronunciation: ``,
    },
    {
      sampleString: `world  ]`,
      wantTerm: `world`,
      wantPronunciation: ``,
    },
    {
      sampleString: `[world]`,
      wantPronunciation: `world`,
    },
    {
      sampleString: `[world  ]`,
      wantPronunciation: `world`,
    },
  ]

  const pronunciationDefinitionTests: Test[] = [
    {
      sampleString: `[hallo  ]world`,
      wantPronunciation: `hallo`,
      wantDefinition: `world`,
    },
    {
      sampleString: `[hallo  world`,
      wantPronunciation: `hallo  world`,
      wantDefinition: ``,
    },
  ]

  const pronunciationDefinitionExampleTests: Test[] = []

  const tests: Test[] = [
    ...termsOnlyTests,
    ...termsPronunciationTests,
    ...termsPronunciationDefinitionTests,
    ...termsPronunciationDefinitionExampleTests,
    ...pronunciationOnlyTests,
    ...pronunciationDefinitionTests,
    ...pronunciationDefinitionExampleTests,
    // TODO: Add more testing type
  ]

  tests.forEach((test) => {
    const parsedWordData = parseInputIntoWordLambda(test.sampleString)
    it(`should return expected output from "${test.sampleString}"`, () => {
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
