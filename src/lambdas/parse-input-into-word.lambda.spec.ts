import { parseInputIntoWordLambda } from './parse-input-into-word.lambda'

const PRIVATE_FINAL_WANT_TERM = `he:lo`
const PRIVATE_FINAL_WANT_PRONUNCIATION = `ha[l$]o`
const PRIVATE_FINAL_WANT_DEFINITION = `wor]d`
const PRIVATE_FINAL_WANT_EXAMPLE = `is the first =code= for beginner`

describe(`parseInputIntoWordLambda`, () => {
  it(`should be exposed as a function`, () => {
    expect(parseInputIntoWordLambda).toBeDefined()
  })

  // TODO: Deprecated, use the test interface below and delete it.
  interface DeprecatedTest {
    sampleString: string
    wantTerm?: string // if undefined, it is considered blank string or ""
    wantPronunciation?: string // if undefined, it is considered blank string or ""
    wantDefinition?: string // if undefined, it is considered blank string or ""
    wantExample?: string // if undefined, it is considered blank string or ""
  }

  interface Test {
    sampleString: string
    wantTerm?: boolean // if true, it expects PRIVATE_FINAL_WANT_TERM, else, empty string or ""
    wantPronunciation?: boolean // if true, it expects PRIVATE_FINAL_WANT_PRONUNCIATION, else, empty string or ""
    wantDefinition?: boolean // if true, it expects PRIVATE_FINAL_WANT_DEFINITION, else, empty string or ""
    wantExample?: boolean // if true, it expects PRIVATE_FINAL_WANT_EXAMPLE, else, empty string or ""
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
      wantExample: `is the first code for beginner`,
    },
  ]

  const definitionTests: Test[] = [
    {
      sampleString: `]wor$]d = `,
      wantDefinition: true,
    },
    {
      sampleString: `:wor$]d =`,
      wantDefinition: true,
    },
  ]

  const definitionExampleTests: Test[] = [
    {
      sampleString: `]wor$]d = is the first $=code$= for beginner`,
      wantDefinition: true,
      wantExample: true,
    },
  ]

  const exampleTests: Test[] = [
    {
      sampleString: ` = is the first $=code$= for beginner `,
      wantExample: true,
    },
  ]

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
    const expectParsedWordData = parseInputIntoWordLambda(
      deprecatedTest.sampleString,
    )
    it(`should return expected output from "${deprecatedTest.sampleString}"`, () => {
      expect(
        expectParsedWordData.term === (deprecatedTest.wantTerm || ``),
      ).toBe(true)
      expect(
        expectParsedWordData.pronunciation ===
          (deprecatedTest.wantPronunciation || ``),
      ).toBe(true)
      expect(
        expectParsedWordData.definition ===
          (deprecatedTest.wantDefinition || ``),
      ).toBe(true)
      expect(
        expectParsedWordData.example === (deprecatedTest.wantExample || ``),
      ).toBe(true)
    })
  })

  const returnWant = (given: undefined | boolean, standard: string): string => {
    if (given === true) return standard
    return ``
  }

  tests.forEach((test) => {
    const parsed = parseInputIntoWordLambda(test.sampleString)

    const wantTerm = returnWant(test.wantTerm, PRIVATE_FINAL_WANT_TERM)
    const wantPronunciation = returnWant(
      test.wantPronunciation,
      PRIVATE_FINAL_WANT_PRONUNCIATION,
    )
    const wantDefinition = returnWant(
      test.wantDefinition,
      PRIVATE_FINAL_WANT_DEFINITION,
    )
    const wantExample = returnWant(test.wantExample, PRIVATE_FINAL_WANT_EXAMPLE)

    it(`should return expected output from "${test.sampleString}"`, () => {
      expect(parsed.term === wantTerm).toBe(true)
      expect(parsed.pronunciation === wantPronunciation).toBe(true)
      expect(parsed.definition === wantDefinition).toBe(true)
      expect(parsed.example === wantExample).toBe(true)
    })
  })
})
