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
import { getWordsApi } from '@/api/words/get-words.api'
import { isEveryFavoriteSelectedState } from '@/recoil/words/semesters.state'

type NewParams = Partial<GetWordParams>
type HandleRefresh = (
  newParams?: NewParams,
  isEveryFavoriteSelected?: boolean,
) => Promise<void>
type UseWordIds = [boolean, HandleRefresh]

// TODO: Write the mode in a separate file (maybe const) because this contains AppConstLogic
type PrivateMode =
  | 'default-mode' // the default page mode that you see when you open up the page
  | 'search-mode' // when you search for a word in a search bar
  | 'every-favorite-mode' // when you click on the every-favorite button
// getMode returns the WordNote's viewing mode defined in "PrivateMode"
const getMode = (
  newParams: Partial<GetWordParams> | undefined,
  isEveryFavoriteSelected?: boolean,
): PrivateMode => {
  if (newParams && newParams.searchInput?.trim()) return `search-mode`
  if (isEveryFavoriteSelected) return `every-favorite-mode`
  else return `default-mode`
}

export const useWords = (): UseWordIds => {
  const [loading, setLoading] = useState(false)
  const onHandleApiError = useHandleApiError()
  const onApplySemesterDetails = useApplySemesterDetails()

  // onGetWords smartly handles each mode defined in PrivateMode and prepare a proper query against the API:
  const onGetWords: HandleRefresh = useRecoilCallback(
    ({ set, reset, snapshot }) =>
      async (newParams?: NewParams, isEveryFavoriteSelected?: boolean) => {
        setLoading(true)
        try {
          // Prepare params:
          let params: Partial<GetWordParams> | undefined = undefined
          let updateParams = false
          switch (
            getMode(
              newParams, // The reason why it checks both isEveryFavoriteSelectedState and isEveryFavoriteSelected
              // is because the state isEveryFavoriteSelectedState is not updated immediately
              // To make sure it is updated, it checks both If one of them is true, it means it is in every-favorite mode
              (await snapshot.getPromise(isEveryFavoriteSelectedState)) ||
                isEveryFavoriteSelected,
            )
          ) {
            case `search-mode`:
              params = {
                searchInput: newParams?.searchInput,
                pageIndex: newParams?.pageIndex,
              }
              break
            case `every-favorite-mode`:
              params = { isFavorite: true, pageIndex: newParams?.pageIndex }
              break

            case `default-mode`:
            default:
              params = {
                ...(await snapshot.getPromise(getWordsParamsState)),
                ...newParams,
              }
              // only stores in cache if it is "normal-mode" excluding:
              // - every-favorite mode
              // - search mode
              updateParams = true
              break
          }

          if (updateParams) set(getWordsParamsState, params)

          // Get words from API:
          const apiResponse = (await getWordsApi(params))[0]
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
