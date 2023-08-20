import { FC } from 'react'
import { WordData } from '@/api/words/interfaces'
import Link from 'next/link'
import { Typography } from '@mui/material'

interface Props {
  word: WordData
}
/**
 * @returns
 *  4 cases to handle:
 *   If exampleLink does not exist, return example despite if it is empty or not. (Handles 2 cases)
 *   If exampleLink exists, but example does not exist, return Sample Example (Handles 2 cases)
 *   If both exampleLink and example exist, return example with link (Handles 2 cases)
 */
const WordCardExamplePart: FC<Props> = ({ word }) => {
  const trimmedExample = word.example.trim()
  const trimmedExampleLink = word.exampleLink.trim()

  if (trimmedExample === `` && trimmedExampleLink)
    return (
      <Link href={trimmedExampleLink} target="_blank">
        Sample Example
      </Link>
    )

  if (!trimmedExampleLink)
    return <Typography>{`"${trimmedExample}"`}</Typography>

  return (
    <Link href={trimmedExampleLink} target="_blank">
      {trimmedExample}
    </Link>
  )
}

export default WordCardExamplePart
