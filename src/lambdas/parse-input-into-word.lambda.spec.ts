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
      sampleString: `hello[hallo] world = is the first code for beginner`,
      wantTerm: `hello`,
      wantPronunciation: `hallo`,
      wantDefinition: `world`,
      wantExample: `is the first code for beginner`,
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

  const pronunciationDefinitionExampleTests: Test[] = [
    {
      sampleString: `[hallo  ]world = is the first code for beginner `,
      wantPronunciation: `hallo`,
      wantDefinition: `world`,
      wantExample: `is the first code for beginner`
    },
  ]

  // TODO: Implement
  const definitionTests: Test[] = []

  // TODO: Implement
  const definitionExampleTests: Test[] = []

  // TODO: Implement
  const exampleTests: Test[] = []


  const tests: Test[] = [
    ...termsOnlyTests,
    ...termsPronunciationTests,
    ...termsPronunciationDefinitionTests,
    ...termsPronunciationDefinitionExampleTests,
    ...pronunciationOnlyTests,
    ...pronunciationDefinitionTests,
    ...pronunciationDefinitionExampleTests,
    ...definitionTests,
    ...definitionExampleTests,
    ...exampleTests,
  ]

  tests.forEach((test) => {
    const expectParsedWordData = parseInputIntoWordLambda(test.sampleString)
    it(`should return expected output from "${test.sampleString}"`, () => {
      expect(expectParsedWordData.term === (test.wantTerm || ``)).toBe(true)
      expect(
        expectParsedWordData.pronunciation === (test.wantPronunciation || ``),
      ).toBe(true)
      expect(expectParsedWordData.definition === (test.wantDefinition || ``)).toBe(
        true,
      )
      expect(expectParsedWordData.example === (test.wantExample || ``)).toBe(true)
    })
  })
})
