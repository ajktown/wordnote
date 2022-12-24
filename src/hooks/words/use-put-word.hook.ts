import { putWordByIdApi } from '@/api/words/put-word-by-id.api'
import { WordDataModifiable } from '@/api/words/words.interface'
import { wordsFamily } from '@/recoil/words.state'
import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'

type UsePutWord = (
  modified: WordDataModifiable,
) => Promise<void> // handleModifyWord

export const usePutWord = (wordId: string): UsePutWord => {
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
    async (modified: WordDataModifiable) => {
      await putWordByIdApi(wordId, modified)
      setWord(wordId, modified)
    },
    [wordId, setWord],
  )

  return handleModifyWord
}
