// ! Fully tested and confirmed on Jan 8, 2023

import { PostWordReqDto } from '@/api/words/interfaces'
import { stringSliceHandler } from '@/handlers/string-slice.handler'

const PRIVATE_FINAL_ESCAPE_CHAR = `$`
const PRIVATE_FINAL_TAG_CHAR = `#`
const PRIVATE_FINAL_EXAMPLE_CHAR = `=`
const PRIVATE_FINAL_DEFINITION_CHARS = [`:`, `]`]
const PRIVATE_FINAL_PRONUNCIATION_CHAR = `[`

export const parseInputIntoWordLambda = (given: string): PostWordReqDto => {
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
    term: term.trim(),
    pronunciation: pronunciation.trim(),
    definition: definition.trim(),
    example: example.trim(),
    exampleLink: ``,
    isFavorite: false,
    tags,
    isArchived: true, // every word parsed through is always archived
  }
}
