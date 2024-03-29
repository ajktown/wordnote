import { GetWordParams } from '@/api/words/interfaces/index.search-params'
import {
  getWordsParamsState,
  wordIdsPagination,
  wordIdsState,
  wordsFamily,
} from '@/recoil/words/words.state'
import { useState } from 'react'
import { useRecoilCallback } from 'recoil'
import { useHandleApiError } from '../use-handle-api-error.hook'
import { useApplySemesterDetails } from '../semesters/use-apply-semester-details'
import { GetWordsApi, getWordsApi } from '@/api/words/get-words.api'

type NewParams = Partial<GetWordParams>
type HandleRefresh = (newParams?: NewParams) => Promise<void>
type UseWordIds = [boolean, HandleRefresh]

export const useWords = (): UseWordIds => {
  const [loading, setLoading] = useState(false)
  const onHandleApiError = useHandleApiError()
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

          let apiResponse: undefined | GetWordsApi = undefined
          if (params.searchInput?.trim()) {
            // if search input is given, then we should get all words from every semester
            apiResponse = (
              await getWordsApi({ searchInput: params.searchInput })
            )[0]
          } else {
            apiResponse = (await getWordsApi(params))[0]
          }
          if (!apiResponse) throw new Error(`apiResponse is undefined`)

          apiResponse.words.forEach((word) => {
            set(wordsFamily(word.id), word)
          })
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

  return [loading, onGetWords]
}
