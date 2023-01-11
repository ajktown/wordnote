import { getWordsApi } from '@/api/words/get-words.api'
import { wordIdsState, wordsFamily } from '@/recoil/words.state'
import { useRecoilCallback } from 'recoil'

export const useWords = () => {
  const handleRefresh = useRecoilCallback(
    ({ set }) =>
      async () => {
        const words = await getWordsApi()
        words.forEach((word) => set(wordsFamily(word.id), word))
        set(
          wordIdsState,
          words.map((word) => word.id),
        )
      },
    [],
  )

  return handleRefresh
}
