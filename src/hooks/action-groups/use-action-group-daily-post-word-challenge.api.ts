import { getActionGroupDailyPostWordChallengeApi } from '@/api/action-groups/get-action-group-daily-post-word-challenge.api'
import { runAfterHandler } from '@/handlers/run-after.handler'
import { isWordPostedDailyState } from '@/states/action-groups/action-groups.state'
import { useRecoilCallback } from 'recoil'

const NULL_TO_LOADING_SECONDS = 2
const PRIVATE_LOADING_TO_RESULT_SECONDS = 1.25
export const useActionGroupDailyPostWordChallengeApi = () => {
  const onGetActionGroupDailyPostWordChallenge = useRecoilCallback(
    ({ set, snapshot }) =>
      async () => {
        try {
          const [res] = await getActionGroupDailyPostWordChallengeApi()
          const currentStatus = await snapshot.getPromise(
            isWordPostedDailyState,
          )
          if (currentStatus === res.isTodayHandled) return // nothing to change

          runAfterHandler(
            () => set(isWordPostedDailyState, undefined), // first show that it is being loaded.
            // run a function that changes the status to the given status from api, after 2 seconds,
            NULL_TO_LOADING_SECONDS,
          )

          runAfterHandler(
            () => set(isWordPostedDailyState, res.isTodayHandled),
            NULL_TO_LOADING_SECONDS + PRIVATE_LOADING_TO_RESULT_SECONDS,
          )
        } catch {
          set(isWordPostedDailyState, null)
        }
      },
    [],
  )

  return onGetActionGroupDailyPostWordChallenge
}
