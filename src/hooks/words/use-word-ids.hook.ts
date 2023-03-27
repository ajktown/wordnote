import { getWordIdsApi } from '@/api/words/get-word-ids.api'
import { wordIdsState } from '@/recoil/words/words.state'
import { useRecoilCallback } from 'recoil'
import { useApiErrorHook } from '../use-api-error.hook'

export const useWordIds = () => {
  const handleApiError = useApiErrorHook()

  const handleRefresh = useRecoilCallback(
    ({ set, reset }) =>
      async () => {
        try {
          const [wordIds] = await getWordIdsApi()
          set(wordIdsState, wordIds)
        } catch (err) {
          reset(wordIdsState)
          handleApiError(err)
        }
      },
    [handleApiError],
  )

  return handleRefresh
}
