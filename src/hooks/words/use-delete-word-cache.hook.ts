import { selectedWordForDialogState, wordIdsState } from '@/recoil/words.state'
import { useRecoilCallback, useResetRecoilState } from 'recoil'

type UseDeleteWordCache = () => Promise<void> // handleDeleteWordCache

export const useDeleteWordCache = (
  deletingWordId: string,
): UseDeleteWordCache => {
  const resetSelectedWordIdForDialog = useResetRecoilState(
    selectedWordForDialogState,
  )

  const handleDeleteWordCache = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        const wordIds = (await snapshot.getPromise(wordIdsState)).filter(
          (wordId) => wordId !== deletingWordId,
        )

        set(wordIdsState, wordIds)
        resetSelectedWordIdForDialog()
      },
    [deletingWordId, resetSelectedWordIdForDialog],
  )

  return handleDeleteWordCache
}
