import { FC, useCallback } from 'react'
import StyledCloudRefresher from '@/atoms/StyledCloudRefresher'
import { usePreference } from '@/hooks/preference/use-preference.hook'
import { useWordsWithSemesters } from '@/hooks/words/use-words-with-semesters.hook'
import { useActionGroupDailyPostWordChallengeApi } from '@/hooks/action-groups/use-action-group-daily-post-word-challenge.api'

const WordCardsFrameRefreshButtonPart: FC = () => {
  const onGetPreference = usePreference()
  const onGetWordsWithSemesters = useWordsWithSemesters()
  const onGetActionGroupDailyPostWordChallenge =
    useActionGroupDailyPostWordChallengeApi()

  const onClickRefresh = useCallback(async () => {
    // run all together
    await Promise.all([
      onGetWordsWithSemesters(),
      onGetPreference(),
      onGetActionGroupDailyPostWordChallenge(),
    ])
  }, [
    onGetWordsWithSemesters,
    onGetPreference,
    onGetActionGroupDailyPostWordChallenge,
  ])

  return <StyledCloudRefresher onClick={onClickRefresh} runOnClickOnce />
}

export default WordCardsFrameRefreshButtonPart
