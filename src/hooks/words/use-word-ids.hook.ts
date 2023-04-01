import { getWordIdsApi } from '@/api/words/get-word-ids.api'
import { GetWordParams } from '@/api/words/interfaces/index.search-params'
import { languageCodesBySemesterState } from '@/recoil/words/languages.state'
import { getWordsParamsState, wordIdsState } from '@/recoil/words/words.state'
import { useState } from 'react'
import { useRecoilCallback } from 'recoil'
import { useApiErrorHook } from '../use-api-error.hook'

type HandleRefresh = (newParams?: Partial<GetWordParams>) => Promise<void>
type UseWordIds = [boolean, HandleRefresh]
export const useWordIds = (): UseWordIds => {
  const [loading, setLoading] = useState(false)
  const handleApiError = useApiErrorHook()

  const handleRefresh: HandleRefresh = useRecoilCallback(
    ({ set, reset, snapshot }) =>
      async (newParams?: Partial<GetWordParams>) => {
        setLoading(true)
        try {
          const params: Partial<GetWordParams> = {
            ...(await snapshot.getPromise(getWordsParamsState)),
            ...newParams,
          }

          const [data] = await getWordIdsApi(params)
          set(wordIdsState, data.wordIds)
          set(languageCodesBySemesterState, data.languages)
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
