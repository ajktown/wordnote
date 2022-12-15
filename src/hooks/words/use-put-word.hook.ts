import { putWordByIdApi } from '@/api/words/put-word-by-id.api'
import { WordDataModifiable } from '@/api/words/words.interface'
import { wordsFamily } from '@/recoil/words.state'
import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'

type UsePutWord = (
  wordId: string,
  modified: WordDataModifiable,
) => Promise<void> // handleModifyWord

export const usePutWord = (): UsePutWord => {
  const setWord = useRecoilCallback(
    ({ snapshot, set }) =>
      async (wordId: string, modified: WordDataModifiable) => {
        const wordData = await snapshot.getPromise(wordsFamily(wordId))
        if (wordData === null) return

        set(wordsFamily(wordId), {
          ...wordData,
          ...modified,
        })
      },
    [],
  )

  const handleModifyWord = useCallback(
    async (wordId: string, modified: WordDataModifiable) => {
      await putWordByIdApi(wordId, modified)
      setWord(wordId, modified)
    },
    [setWord],
  )

  return handleModifyWord
}
