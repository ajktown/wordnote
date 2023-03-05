import { getWordsApi } from '@/api/words/get-words.api'
import { wordIdsState, wordsFamily } from '@/recoil/words.state'
import { useRecoilCallback } from 'recoil'

export const useWords = () => {
  const handleRefresh = useRecoilCallback(
    ({ set }) =>
      async () => {
        try {
          const [words] = await getWordsApi()
          const wordIds: string[] = []

          words.forEach((word) => {
            set(wordsFamily(word.id), word)
            wordIds.push(word.id)
          })

          set(wordIdsState, wordIds)
        } catch {}
      },
    [],
  )

  return handleRefresh
}
