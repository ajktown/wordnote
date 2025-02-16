import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { wordsFamily } from '@/recoil/words/words.state'
import { usePutWord } from '@/hooks/words/use-put-word.hook'
import { WordData } from '@/api/words/interfaces'

type UsePutWordIsPinned = [undefined | null | WordData, () => Promise<void>]
export const usePutWordIsPinned = (wordId: string): UsePutWordIsPinned => {
  const word = useRecoilValue(wordsFamily(wordId))

  const [, onPutWord] = usePutWord(wordId)

  const onPutPinned = useCallback(async () => {
    if (word == null) return

    const modifyingTo = !word.isPinned
    await onPutWord({ isPinned: modifyingTo })
  }, [word, onPutWord])

  return [word, onPutPinned]
}
