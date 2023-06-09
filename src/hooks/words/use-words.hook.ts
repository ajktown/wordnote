import { getWordsApi } from '@/api/words/get-words.api'
import { wordsFamily } from '@/recoil/words/words.state'
import { useRecoilCallback } from 'recoil'
import { useApiErrorHook } from '../use-api-error.hook'
import { useApplySemesterDetails } from '../semesters/use-apply-semester-details'

export const useWords = () => {
  const handleApiError = useApiErrorHook()
  const handleApplySemesterDetails = useApplySemesterDetails()

  const handleRefresh = useRecoilCallback(
    ({ set }) =>
      async () => {
        try {
          const [apiResponse] = await getWordsApi()

          apiResponse.words.forEach((word) => {
            set(wordsFamily(word.id), word)
          })
          handleApplySemesterDetails(apiResponse)
        } catch (err) {
          handleApiError(err)
        }
      },
    [handleApiError, handleApplySemesterDetails],
  )

  return handleRefresh
}
