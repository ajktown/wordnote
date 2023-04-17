import { getWordIdsApi } from '@/api/words/get-word-ids.api'
import { GetWordParams } from '@/api/words/interfaces/index.search-params'
import { getWordsParamsState, wordIdsState } from '@/recoil/words/words.state'
import { useState } from 'react'
import { useRecoilCallback } from 'recoil'
import { useApiErrorHook } from '../use-api-error.hook'
import { searchInputState } from '@/recoil/words/searchInput.state'

type NewParams = Partial<Omit<GetWordParams, 'searchInput'>>
type HandleRefresh = (newParams?: NewParams) => Promise<void>
type UseWordIds = [boolean, HandleRefresh]

export const useWordIds = (): UseWordIds => {
  const [loading, setLoading] = useState(false)
  const handleApiError = useApiErrorHook()

  const handleRefresh: HandleRefresh = useRecoilCallback(
    ({ set, reset, snapshot }) =>
      async (newParams?: NewParams) => {
        setLoading(true)
        try {
          const searchInput = await snapshot.getPromise(searchInputState)

          const params: Partial<GetWordParams> = {
            ...(await snapshot.getPromise(getWordsParamsState)),
            ...newParams,
            ...(searchInput ? { searchInput } : {}),
          }

          const [data] = await getWordIdsApi(params)
          set(wordIdsState, data.wordIds)
          set(getWordsParamsState, params)
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
