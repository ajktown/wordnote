import { wordIdsState } from '@/recoil/words.state'
import { useRecoilCallback } from 'recoil'

type UseDeleteWordCache = (
  wordId: string,
) => Promise<void> // handleDeleteWordCache

export const useDeleteWordCache = (): UseDeleteWordCache => {
  const handleDeleteWordCache = useRecoilCallback(
    ({ snapshot, set }) =>
      async (givenWordId: string) => {
        const wordIds = 
          (await snapshot.getPromise(wordIdsState))
          .filter(wordId => wordId !== givenWordId)

        set(wordIdsState, wordIds)
      },
    [],
  )

  return handleDeleteWordCache
}
