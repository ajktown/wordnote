// Reset search input to undefined hook
import { getWordIdsApi } from '@/api/words/get-word-ids.api'
import { GetWordParams } from '@/api/words/interfaces/index.search-params'
import { getWordsParamsState, wordIdsState } from '@/recoil/words/words.state'
import { useState } from 'react'
import { useRecoilCallback } from 'recoil'
import { useApiErrorHook } from '../use-api-error.hook'
import { searchInputState } from '@/recoil/words/searchInput.state'

type HandleRefresh = () => Promise<void>
type UseResetSearchInput = [boolean, HandleRefresh]
export const useResetSearchInput = (): UseResetSearchInput => {
  const [loading, setLoading] = useState(false)
  const handleApiError = useApiErrorHook()

  const handleRefresh: HandleRefresh = useRecoilCallback(
    ({ set, reset, snapshot }) =>
      async () => {
        setLoading(true)
        try {
          const params: Partial<GetWordParams> = {
            ...(await snapshot.getPromise(getWordsParamsState)),
            searchInput: undefined,
          }

          const [data] = await getWordIdsApi(params)
          set(wordIdsState, data.wordIds)
          set(getWordsParamsState, params)
          reset(searchInputState)
        } catch (err) {
          reset(wordIdsState)
          handleApiError(err)
        } finally {
          setLoading(false)
        }
      },
    [handleApiError],
  )

  return [loading, handleRefresh]
}
