import {
  selectedWordIdForDialogState,
  wordIdsState,
} from '@/recoil/words.state'
import { useRecoilCallback, useResetRecoilState } from 'recoil'

type UseDeleteWordCache = () => Promise<void> // handleDeleteWordCache

export const useDeleteWordCache = (
  deletingWordId: string,
): UseDeleteWordCache => {
  const onCloseWordEditingDialog = useResetRecoilState(
    selectedWordIdForDialogState,
  )

  const handleDeleteWordCache = useRecoilCallback(
    ({ snapshot, set }) =>
      async () => {
        const wordIds = (await snapshot.getPromise(wordIdsState)).filter(
          (wordId) => wordId !== deletingWordId,
        )

        set(wordIdsState, wordIds)
        onCloseWordEditingDialog()
      },
    [deletingWordId, onCloseWordEditingDialog],
  )

  return handleDeleteWordCache
}
