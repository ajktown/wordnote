import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { wordsFamily } from '@/recoil/words/words.state'
import { usePutWord } from '@/hooks/words/use-put-word.hook'
import { WordData } from '@/api/words/interfaces'

type UsePutWordTagDeleted = [
  WordData | null | undefined,
  (deletingLabel: string) => Promise<void>,
]
export const usePutWordTagDeleted = (wordId: string): UsePutWordTagDeleted => {
  const word = useRecoilValue(wordsFamily(wordId))
  const [, onPutWord] = usePutWord(wordId)

  const onClickDelete = useCallback(
    async (deletingLabel: string) => {
      if (word == null) return
      await onPutWord({
        tags: word.tags.filter((tag) => tag !== deletingLabel),
      })
    },
    [word, onPutWord],
  )

  return [word, onClickDelete]
}
