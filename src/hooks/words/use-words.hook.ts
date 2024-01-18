import { GetWordParams } from '@/api/words/interfaces/index.search-params'
import {
  getWordsParamsState,
  wordIdsPagination,
  wordIdsState,
  wordsFamily,
} from '@/recoil/words/words.state'
import { useState } from 'react'
import { useRecoilCallback } from 'recoil'
import { useApiErrorHook } from '../use-api-error.hook'
import { useApplySemesterDetails } from '../semesters/use-apply-semester-details'
import { getWordsApi } from '@/api/words/get-words.api'

type NewParams = Partial<GetWordParams>
type HandleRefresh = (newParams?: NewParams) => Promise<void>
type UseWordIds = [boolean, HandleRefresh]

export const useWords = (): UseWordIds => {
  const [loading, setLoading] = useState(false)
  const handleApiError = useApiErrorHook()
  const onApplySemesterDetails = useApplySemesterDetails()

  const onGetWords: HandleRefresh = useRecoilCallback(
    ({ set, reset, snapshot }) =>
      async (newParams?: NewParams) => {
        setLoading(true)
        try {
          const params: Partial<GetWordParams> = {
            ...(await snapshot.getPromise(getWordsParamsState)),
            ...newParams,
          }
          set(getWordsParamsState, params)
          const [apiResponse] = await getWordsApi(params)
          apiResponse.words.forEach((word) => {
            set(wordsFamily(word.id), word)
          })
          set(wordIdsState, apiResponse.wordIds)
          set(wordIdsPagination, apiResponse.pagination)
          onApplySemesterDetails(apiResponse)
        } catch (err) {
          reset(wordIdsState)
          handleApiError(err)
        } finally {
          setLoading(false)
        }
      },
    [handleApiError, onApplySemesterDetails],
  )

  return [loading, onGetWords]
}
