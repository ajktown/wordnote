import { useCallback } from 'react'
import { usePutWord } from './use-put-word.hook'

type UsePutWordArchive = [
  boolean, // loading
  () => Promise<void>, // onPutWordArchive
]

export const usePutWordArchive = (
  wordId: string,
  isArchived: boolean,
): UsePutWordArchive => {
  const [loading, onPutWord] = usePutWord(wordId)

  const onPutWordArchive = useCallback(
    async () => onPutWord({ isArchived }),
    [isArchived, onPutWord],
  )

  return [loading, onPutWordArchive]
}
