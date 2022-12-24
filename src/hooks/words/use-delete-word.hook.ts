import { deleteWordByIdApi } from '@/api/words/delete-words.api'
import { wordsFamily } from '@/recoil/words.state'
import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'

type UseDeleteWord = () => Promise<void> // handleDeleteWord

export const useDeleteWord = (deletingWordId: string): UseDeleteWord => {
  const setWord = useRecoilCallback(
    ({ snapshot, set }) =>
      async (wordId: string) => {
        const wordData = await snapshot.getPromise(wordsFamily(wordId))
        if (wordData === null) return

        set(wordsFamily(wordId), {
          ...wordData,
          isDeleted: true,
        })
      },
    [],
  )

  const handleDeleteWord = useCallback(async () => {
    try {
      await deleteWordByIdApi(deletingWordId)
      setWord(deletingWordId)
    } catch {}
  }, [deletingWordId, setWord])

  return handleDeleteWord
}
