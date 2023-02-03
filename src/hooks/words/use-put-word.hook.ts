import { putWordByIdApi } from '@/api/words/put-word-by-id.api'
import { WordDataModifiable } from '@/api/words/words.interface'
import { wordsFamily } from '@/recoil/words.state'
import { useRecoilCallback } from 'recoil'

type UsePutWord = (modified: Partial<WordDataModifiable>) => Promise<void> // handlePutWord

export const usePutWord = (wordId: string): UsePutWord => {
  const handlePutWord = useRecoilCallback(
    ({ snapshot, set }) =>
      async (modified: Partial<WordDataModifiable>) => {
        const wordData = await snapshot.getPromise(wordsFamily(wordId))
        if (wordData === null) return

        await putWordByIdApi(wordId, modified)

        set(wordsFamily(wordId), {
          ...wordData,
          ...modified,
        })
      },
    [],
  )

  return handlePutWord
}
