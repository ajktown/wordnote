import { FC } from 'react'
import { ISharedWord } from '@/api/words/interfaces'
import Link from 'next/link'
import { Typography } from '@mui/material'

const PRIVATE_VARIANT = `body2`
interface Props {
  word: ISharedWord
  reviewMode?: boolean // if review mode, it shows "???"
}
/**
 * @returns
 *  4 cases to handle:
 *   If exampleLink does not exist, return example despite if it is empty or not. (Handles 2 cases)
 *   If exampleLink exists, but example does not exist, return Sample Example (Handles 2 cases)
 *   If both exampleLink and example exist, return example with link (Handles 2 cases)
 */
const WordCardExamplePart: FC<Props> = ({ word, reviewMode }) => {
  const exampleTrimmed = word.example.trim()
  const linkExampleTrimmed = word.exampleLink.trim()

  // does it have two double quote?
  const hasTwoDoubleQuotes = exampleTrimmed.match(/"/g)?.length === 2

  // It is more confusing to show anything, if double quotes are not given
  if (reviewMode && !hasTwoDoubleQuotes) return null

  // only show non-double quote strings and the double quote becomes ???
  if (reviewMode && hasTwoDoubleQuotes) {
    // splice the string
    const firstQuote = exampleTrimmed.indexOf(`"`)
    const secondQuote = exampleTrimmed.indexOf(`"`, firstQuote + 1)

    return (
      <Typography variant={PRIVATE_VARIANT}>
        {exampleTrimmed.slice(0, firstQuote) +
          `_` + // default underline is 1 character
          word.term.replace(/./g, `_`) +
          exampleTrimmed.slice(secondQuote + 1)}
      </Typography>
    )
  }

  if (!exampleTrimmed && linkExampleTrimmed)
    return (
      <Link href={linkExampleTrimmed} target="_blank">
        <Typography
          variant={PRIVATE_VARIANT}
        >{`${linkExampleTrimmed}`}</Typography>
      </Link>
    )

  if (!linkExampleTrimmed && !exampleTrimmed) return null

  if (!linkExampleTrimmed)
    return <Typography variant={PRIVATE_VARIANT}>{exampleTrimmed}</Typography>

  return (
    <Link href={linkExampleTrimmed} target="_blank">
      <Typography variant={PRIVATE_VARIANT}>{exampleTrimmed}</Typography>
    </Link>
  )
}

export default WordCardExamplePart
