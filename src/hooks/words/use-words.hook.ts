import { getWordsApi } from '@/api/words/get-words.api'
import { wordIdsState, wordsFamily } from '@/recoil/words/words.state'
import { useRecoilCallback } from 'recoil'
import { useApiErrorHook } from '../use-api-error.hook'

export const useWords = () => {
  const handleApiError = useApiErrorHook()

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
        } catch (err) {
          handleApiError(err)
        }
      },
    [handleApiError],
  )

  return handleRefresh
}
