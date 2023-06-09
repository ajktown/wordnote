import { getWordsApi } from '@/api/words/get-words.api'
import { wordsFamily } from '@/recoil/words/words.state'
import { useRecoilCallback } from 'recoil'
import { useApiErrorHook } from '../use-api-error.hook'

export const useWords = () => {
  const handleApiError = useApiErrorHook()

  const handleRefresh = useRecoilCallback(
    ({ set }) =>
      async () => {
        try {
          const [words] = await getWordsApi()

          words.words.forEach((word) => {
            set(wordsFamily(word.id), word)
          })
        } catch (err) {
          handleApiError(err)
        }
      },
    [handleApiError],
  )

  return handleRefresh
}
