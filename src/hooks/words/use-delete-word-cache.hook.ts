import {
  selectedWordIdForDialogState,
  wordIdsState,
} from '@/recoil/words/words.state'
import { useState } from 'react'
import { useRecoilCallback } from 'recoil'

type UseDeleteWordCache = [
  boolean,
  () => Promise<void>, // handleDeleteWordCache
]

export const useDeleteWordCache = (
  deletingWordId: string,
): UseDeleteWordCache => {
  const [loading, setLoading] = useState(false)

  const onDeleteWordCache = useRecoilCallback(
    ({ snapshot, set, reset }) =>
      async () => {
        try {
          setLoading(true)
          const wordIds = (await snapshot.getPromise(wordIdsState)).filter(
            (wordId) => wordId !== deletingWordId,
          )

          set(wordIdsState, wordIds)
          reset(selectedWordIdForDialogState)
        } finally {
          setLoading(false)
        }
      },
    [deletingWordId],
  )

  return [loading, onDeleteWordCache]
}
