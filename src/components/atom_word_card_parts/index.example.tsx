import { FC } from 'react'
import { WordData } from '@/api/words/interfaces'
import Link from 'next/link'
import { Typography } from '@mui/material'

interface Props {
  word: WordData
}
const WordCardExamplePart: FC<Props> = ({ word }) => {
  const trimmedExample = word.example.trim()
  const trimmedExampleLink = word.exampleLink.trim()

  if (trimmedExample === `` && trimmedExampleLink)
    return (
      <Link href={trimmedExampleLink} target="_blank">
        Sample Example
      </Link>
    )

  if (trimmedExampleLink === ``) return <Typography>{trimmedExampleLink}</Typography>

  return (
    <Link href={trimmedExampleLink} target="_blank">
      {word.example}
    </Link>
  )
}

export default WordCardExamplePart
