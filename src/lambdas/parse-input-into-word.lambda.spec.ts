import { parseInputIntoWordLambda } from './parse-input-into-word.lambda'

const PRIVATE_FINAL_WANT_ESCAPER_SIGN_INDEX = 2
const PRIVATE_FINAL_WANT_TERM = "hello"
const PRIVATE_FINAL_WANT_PRONUNCIATION = "hallo"
const PRIVATE_FINAL_WANT_DEFINITION = "hello"
const PRIVATE_FINAL_WANT_EXAMPLE = "is the first code for beginner"

describe(`parseInputIntoWordLambda`, () => {
  it(`should be exposed as a function`, () => {
    expect(parseInputIntoWordLambda).toBeDefined()
  })

  interface DeprecatedTest {
    sampleString: string
    wantTerm?: string // if undefined, it is considered blank string or ""
    wantPronunciation?: string // if undefined, it is considered blank string or ""
    wantDefinition?: string // if undefined, it is considered blank string or ""
    wantExample?: string // if undefined, it is considered blank string or ""
  }

  interface Test {
    sampleString: string

    // ! Below variables explanation begins
    // if undefined, expecting empty string or ""
    // if true, it expects PRIVATE_FINAL_WANT_TERM (PRONUNCIATION, DEFINITION, EXAMPLE)
    // if false, expects dollar sign on index "PRIVATE_FINAL_WANT_ESCAPER_SIGN_INDEX"
    wantTerm?: boolean
    wantPronunciation?: boolean
    wantDefinition?: boolean
    wantExample?: boolean
    // ! Above variables explanation ends
  }

  const termsOnlyTests: DeprecatedTest[] = [
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

  const termsPronunciationTests: DeprecatedTest[] = [
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

  const termsPronunciationDefinitionTests: DeprecatedTest[] = [
    {
      sampleString: `]`,
      wantDefinition: ``,
    },
    {
      sampleString: `]world`,
      wantDefinition: `world`,
    },
  ]

  const termsPronunciationDefinitionExampleTests: DeprecatedTest[] = [
    {
      sampleString: `hello[hallo] world = is the first code for beginner`,
      wantTerm: `hello`,
      wantPronunciation: `hallo`,
      wantDefinition: `world`,
      wantExample: `is the first code for beginner`,
    },
  ]

  const pronunciationOnlyTests: DeprecatedTest[] = [
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

  const pronunciationDefinitionTests: DeprecatedTest[] = [
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

  const pronunciationDefinitionExampleTests: DeprecatedTest[] = [
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


  const deprecatedTests: DeprecatedTest[] = [
    ...termsOnlyTests,
    ...termsPronunciationTests,
    ...termsPronunciationDefinitionTests,
    ...termsPronunciationDefinitionExampleTests,
    ...pronunciationOnlyTests,
    ...pronunciationDefinitionTests,
    ...pronunciationDefinitionExampleTests,
  ]

  const tests: Test[] = [
    ...definitionTests,
    ...definitionExampleTests,
    ...exampleTests,
  ]

  deprecatedTests.forEach((deprecatedTest) => {
    const expectParsedWordData = parseInputIntoWordLambda(deprecatedTest.sampleString)
    it(`should return expected output from "${deprecatedTest.sampleString}"`, () => {
      expect(expectParsedWordData.term === (deprecatedTest.wantTerm || ``)).toBe(true)
      expect(
        expectParsedWordData.pronunciation === (deprecatedTest.wantPronunciation || ``),
      ).toBe(true)
      expect(expectParsedWordData.definition === (deprecatedTest.wantDefinition || ``)).toBe(
        true,
      )
      expect(expectParsedWordData.example === (deprecatedTest.wantExample || ``)).toBe(true)
    })
  })

  tests.forEach((test) => {
    const expectParsedWordData = parseInputIntoWordLambda(test.sampleString)
    // TODO: Implement
  })
})
