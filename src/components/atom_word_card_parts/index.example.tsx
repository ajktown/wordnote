import { FC } from 'react'
import { WordData } from '@/api/words/interfaces'
import Link from 'next/link'

interface Props {
  word: WordData
}
const WordCardExamplePart: FC<Props> = ({ word }) => {
  if (word.example.trim() === `` && word.exampleLink)
    return (
      <Link href={word.exampleLink} target="_blank">
        Sample Example
      </Link>
    )

  return (
    <Link href={word.exampleLink} target="_blank">
      {word.example}
    </Link>
  )
}

export default WordCardExamplePart
