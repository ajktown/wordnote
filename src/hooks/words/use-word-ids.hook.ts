import { getWordIdsApi } from '@/api/words/get-word-ids.api'
import { GetWordParams } from '@/api/words/interfaces/index.search-params'
import {
  getWordsParamsState,
  wordIdsPagination,
  wordIdsState,
} from '@/states/words/words.state'
import { useState } from 'react'
import { useRecoilCallback } from 'recoil'
import { useHandleApiError } from '../use-handle-api-error.hook'
import { useApplySemesterDetails } from '../semesters/use-apply-semester-details'

type NewParams = Partial<GetWordParams>
type OnGetWordsIds = (newParams?: NewParams) => Promise<void>
type UseWordIds = [boolean, OnGetWordsIds]

export const useWordIds = (): UseWordIds => {
  const [loading, setLoading] = useState(false)
  const onHandleApiError = useHandleApiError()
  const onApplySemesterDetails = useApplySemesterDetails()

  const onGetWordsIds: OnGetWordsIds = useRecoilCallback(
    ({ set, reset, snapshot }) =>
      async (newParams?: NewParams) => {
        setLoading(true)
        try {
          const params: Partial<GetWordParams> = {
            ...(await snapshot.getPromise(getWordsParamsState)),
            ...newParams,
          }
          set(getWordsParamsState, params)
          const [apiResponse] = await getWordIdsApi(params)
          set(wordIdsState, apiResponse.wordIds)
          set(wordIdsPagination, apiResponse.pagination)
          onApplySemesterDetails(apiResponse)
        } catch (err) {
          reset(wordIdsState)
          onHandleApiError(err)
        } finally {
          setLoading(false)
        }
      },
    [onHandleApiError, onApplySemesterDetails],
  )

  return [loading, onGetWordsIds]
}
