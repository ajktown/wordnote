import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { wordsFamily } from '@/states/words/words.state'
import { usePutWord } from '@/hooks/words/use-put-word.hook'
import { WordData } from '@/api/words/interfaces'

type UsePutWordIsPinned = [undefined | null | WordData, () => Promise<void>]
export const usePutWordIsPinned = (wordId: string): UsePutWordIsPinned => {
  const word = useRecoilValue(wordsFamily(wordId))

  const [, onPutWord] = usePutWord(wordId)

  const onPutPinned = useCallback(async () => {
    if (word == null) return // nothing can be done with unknown word
    await onPutWord({ isPinned: !word.isPinned })
  }, [word, onPutWord])

  return [word, onPutPinned]
}
