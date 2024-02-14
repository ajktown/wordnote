import { deleteWordByIdApi } from '@/api/words/delete-words.api'
import { wordsFamily } from '@/recoil/words/words.state'
import { useCallback, useState } from 'react'
import { useRecoilCallback } from 'recoil'
import { useActionGroups } from '../action-groups/use-action-groups.hook'

type UseDeleteWord = [
  boolean,
  () => Promise<void>, // handleDeleteWord
]

export const useDeleteWord = (deletingWordId: string): UseDeleteWord => {
  const [isDeleting, setDeleting] = useState(false)
  const onGetActionGroups = useActionGroups()

  const setWord = useRecoilCallback(
    ({ snapshot, set }) =>
      async (wordId: string) => {
        const wordData = await snapshot.getPromise(wordsFamily(wordId))
        if (wordData == null) return

        set(wordsFamily(wordId), {
          ...wordData,
          isDeleted: true,
        })
      },
    [],
  )

  const onDeleteWord = useCallback(async () => {
    try {
      setDeleting(true)
      await deleteWordByIdApi(deletingWordId)
      setWord(deletingWordId)
    } finally {
      setDeleting(false)
      onGetActionGroups()
    }
  }, [deletingWordId, setWord, onGetActionGroups])

  return [isDeleting, onDeleteWord]
}
