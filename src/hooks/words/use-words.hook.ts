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
import { isEveryFavoriteSelectedState } from '@/recoil/words/semesters.state'

type NewParams = Partial<GetWordParams>
type HandleRefresh = (
  newParams?: NewParams,
  isEveryFavoriteSelected?: boolean,
) => Promise<void>
type UseWordIds = [boolean, HandleRefresh]

export const useWords = (): UseWordIds => {
  const [loading, setLoading] = useState(false)
  const onHandleApiError = useHandleApiError()
  const onApplySemesterDetails = useApplySemesterDetails()

  // onGetWords smartly handles both situation
  // just a normal semester mode
  // every-favorite mode (Only favorite words)
  const onGetWords: HandleRefresh = useRecoilCallback(
    ({ set, reset, snapshot }) =>
      async (newParams?: NewParams, isEveryFavoriteSelected?: boolean) => {
        setLoading(true)
        try {
          // Prepare params:
          let params: Partial<GetWordParams> | undefined = undefined
          let updateParams = false
          if (newParams && newParams.searchInput?.trim()) {
            params = { searchInput: newParams.searchInput }
          } else if (
            // The reason why it checks both isEveryFavoriteSelectedState and isEveryFavoriteSelected
            // is because the state isEveryFavoriteSelectedState is not updated immediately
            // To make sure it is updated, it checks both If one of them is true, it means it is in every-favorite mode
            (await snapshot.getPromise(isEveryFavoriteSelectedState)) ||
            isEveryFavoriteSelected
          ) {
            params = { isFavorite: true, pageIndex: newParams?.pageIndex }
          } else {
            params = {
              ...(await snapshot.getPromise(getWordsParamsState)),
              ...newParams,
            }
            // only stores in cache if it is "normal-mode" excluding:
            // - every-favorite mode
            // - search mode
            updateParams = true
          }
          if (updateParams) set(getWordsParamsState, params)

          // Get words from API:
          const apiResponse: undefined | GetWordsApi = (
            await getWordsApi(params)
          )[0]
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
