import { getWordByIdApi } from '@/api/words/get-word-by-id.api'
import { wordsFamily } from '@/recoil/words/words.state'
import { useRecoilCallback } from 'recoil'
import { useApiErrorHook } from '../use-api-error.hook'

export const useWordById = (id: string) => {
  const handleApiError = useApiErrorHook()

  const handleRefresh = useRecoilCallback(
    ({ set }) =>
      async () => {
        try {
          const [word] = await getWordByIdApi(id)
          set(wordsFamily(word.id), word)
        } catch (err) {
          handleApiError(err)
        }
      },
    [id, handleApiError],
  )

  return handleRefresh
}
