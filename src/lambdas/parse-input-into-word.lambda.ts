// ! Fully tested and confirmed on Jan 8, 2023

import { WordData } from '@/api/words/interfaces'
import { getRandomHexHandler } from '@/handlers/get-random-hex.handler'
import { stringSliceHandler } from '@/handlers/string-slice.handler'

const PRIVATE_FINAL_ESCAPE_CHAR = `$`
const PRIVATE_FINAL_TAG_CHAR = `#`
const PRIVATE_FINAL_EXAMPLE_CHAR = `=`
const PRIVATE_FINAL_DEFINITION_CHARS = [`:`, `]`]
const PRIVATE_FINAL_PRONUNCIATION_CHAR = `[`

export const parseInputIntoWordLambda = (given: string): WordData => {
  const tags: string[] = []
  let leftOverAfterTags: string = given

  while (leftOverAfterTags) {
    const [leftOverAfterEachTag, tag] = stringSliceHandler(
      leftOverAfterTags,
      PRIVATE_FINAL_TAG_CHAR,
      PRIVATE_FINAL_ESCAPE_CHAR,
    )
    if (leftOverAfterTags === leftOverAfterEachTag) break

    const trimmedTag = tag.trim()
    if (trimmedTag) tags.push(trimmedTag) // Empty tag will not be pushed
    leftOverAfterTags = leftOverAfterEachTag
  }
  tags.reverse() // Collected tags will be reversed.

  const [leftOverAfterExample, example] = stringSliceHandler(
    leftOverAfterTags,
    PRIVATE_FINAL_EXAMPLE_CHAR,
    PRIVATE_FINAL_ESCAPE_CHAR,
  )
  const [leftOverAfterDefinition, definition] = stringSliceHandler(
    leftOverAfterExample,
    PRIVATE_FINAL_DEFINITION_CHARS,
    PRIVATE_FINAL_ESCAPE_CHAR,
  )
  const [term, pronunciation] = stringSliceHandler(
    leftOverAfterDefinition,
    PRIVATE_FINAL_PRONUNCIATION_CHAR,
    PRIVATE_FINAL_ESCAPE_CHAR,
  )

  return {
    id: given + getRandomHexHandler(),
    languageCode: `en`,
    semester: 231, // TODO: Remove, its only for test. Semester value should be created by server
    createdAt: new Date().toString(),
    term: term.trim(),
    pronunciation: pronunciation.trim(),
    definition: definition.trim(),
    example: example.trim(),
    isFavorite: false,
    tags,
  }
}
