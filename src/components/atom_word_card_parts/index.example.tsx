import { FC } from 'react'
import { ISharedWord, WordData } from '@/api/words/interfaces'
import Link from 'next/link'
import { Typography } from '@mui/material'

const PRIVATE_VARIANT = `body2`
interface Props {
  word: WordData | ISharedWord
}
/**
 * @returns
 *  4 cases to handle:
 *   If exampleLink does not exist, return example despite if it is empty or not. (Handles 2 cases)
 *   If exampleLink exists, but example does not exist, return Sample Example (Handles 2 cases)
 *   If both exampleLink and example exist, return example with link (Handles 2 cases)
 */
const WordCardExamplePart: FC<Props> = ({ word }) => {
  const exampleTrimmed = word.example.trim()
  const linkExampleTrimmed = word.exampleLink.trim()

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
    return (
      <Typography variant={PRIVATE_VARIANT}>{`"${exampleTrimmed}"`}</Typography>
    )

  return (
    <Link href={linkExampleTrimmed} target="_blank">
      <Typography variant={PRIVATE_VARIANT}>{`"${exampleTrimmed}"`}</Typography>
    </Link>
  )
}

export default WordCardExamplePart
