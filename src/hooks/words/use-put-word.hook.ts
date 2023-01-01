import { putWordByIdApi } from '@/api/words/put-word-by-id.api'
import { WordDataModifiable } from '@/api/words/words.interface'
import { wordsFamily } from '@/recoil/words.state'
import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'

type UsePutWord = (modified: Partial<WordDataModifiable>) => Promise<void> // handlePutWord

export const usePutWord = (wordId: string): UsePutWord => {
  const setWord = useRecoilCallback(
    ({ snapshot, set }) =>
      async (wordId: string, modified: Partial<WordDataModifiable>) => {
        const wordData = await snapshot.getPromise(wordsFamily(wordId))
        if (wordData === null) return

        set(wordsFamily(wordId), {
          ...wordData,
          ...modified,
        })
      },
    [],
  )

  const handlePutWord: UsePutWord = useCallback(
    async (modified: Partial<WordDataModifiable>) => {
      await putWordByIdApi(wordId, modified)
      setWord(wordId, modified)
    },
    [wordId, setWord],
  )

  return handlePutWord
}
