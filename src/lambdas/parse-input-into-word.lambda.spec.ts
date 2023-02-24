import { parseInputIntoWordLambda } from './parse-input-into-word.lambda'

const PRIVATE_FINAL_WANT_TERM = `he:lo`
const PRIVATE_FINAL_WANT_PRONUNCIATION = `ha[l$]o`
const PRIVATE_FINAL_WANT_DEFINITION = `wor]d`
const PRIVATE_FINAL_WANT_EXAMPLE = `is the first =code= for beginner`
const PRIVATE_FINAL_WANT_TAG_A = `tag$#One`
const PRIVATE_FINAL_WANT_TAG_B = `tag$Two$#`
const PRIVATE_FINAL_WANT_TAGS = [
  PRIVATE_FINAL_WANT_TAG_A,
  PRIVATE_FINAL_WANT_TAG_B,
]

describe(`parseInputIntoWordLambda(given: string)`, () => {
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
    wantTags?: boolean // if true, it expects PRIVATE_FINAL_WANT_TAGS, else, empty string or ""
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

  const wordDefinitionTagsTests: Test[] = [
    {
      sampleString: ` he:lo: wor$]d #  tag$$#One  #  tag$Two$$# `,
      wantTerm: true,
      wantDefinition: true,
      wantTags: true,
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
    ...wordDefinitionTagsTests,
  ]

  deprecatedTests.forEach((deprecatedTest) => {
    const gotParsedWord = parseInputIntoWordLambda(deprecatedTest.sampleString)
    const wantTerm = deprecatedTest.wantTerm || ``
    const wantPronunciation = deprecatedTest.wantPronunciation || ``
    const wantDefinition = deprecatedTest.wantDefinition || ``
    const wantExample = deprecatedTest.wantExample || ``

    it(`should return term "${wantTerm}" with arg(s) "${deprecatedTest.sampleString}"`, () => {
      expect(gotParsedWord.term).toBe(wantTerm)
    })
    it(`should return pronunciation "${wantPronunciation}" with arg(s) "${deprecatedTest.sampleString}"`, () => {
      expect(gotParsedWord.pronunciation).toBe(wantPronunciation)
    })
    it(`should return definition "${wantDefinition}" with arg(s) "${deprecatedTest.sampleString}"`, () => {
      expect(gotParsedWord.definition).toBe(wantDefinition)
    })
    it(`should return example "${wantExample}" with arg(s) "${deprecatedTest.sampleString}"`, () => {
      expect(gotParsedWord.example).toBe(wantExample)
    })
  })

  const returnWant = (given: undefined | boolean, standard: string): string => {
    if (given === true) return standard
    return ``
  }

  tests.forEach((test) => {
    const gotParsedWord = parseInputIntoWordLambda(test.sampleString)

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

    it(`should return term "${wantTerm}" with arg(s) "${test.sampleString}"`, () => {
      expect(gotParsedWord.term).toBe(wantTerm)
    })
    it(`should return pronunciation "${wantPronunciation}" with arg(s) "${test.sampleString}"`, () => {
      expect(gotParsedWord.pronunciation).toBe(wantPronunciation)
    })
    it(`should return definition "${wantDefinition}" with arg(s) "${test.sampleString}"`, () => {
      expect(gotParsedWord.definition).toBe(wantDefinition)
    })
    it(`should return example "${wantExample}" with arg(s) "${test.sampleString}"`, () => {
      expect(gotParsedWord.example).toBe(wantExample)
    })

    if (test.wantTags) {
      it(`should return tags length "${PRIVATE_FINAL_WANT_TAGS.length}" with arg(s) "${test.sampleString}"`, () => {
        expect(gotParsedWord.tags.length).toBe(PRIVATE_FINAL_WANT_TAGS.length)
      })

      for (const eachParsedTag of gotParsedWord.tags) {
        it(`should contain a tag "${eachParsedTag}" with arg(s) "${test.sampleString}"`, () => {
          expect(PRIVATE_FINAL_WANT_TAGS.includes(eachParsedTag)).toBe(true)
        })
      }
    }
  })
})
