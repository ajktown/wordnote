import { FC, useCallback } from 'react'
import StyledCloudRefresher from '@/atoms/StyledCloudRefresher'
import { usePreference } from '@/hooks/preference/use-preference.hook'
import { useWordsWithSemesters } from '@/hooks/words/use-words-with-semesters.hook'

const WordCardsFrameRefreshButtonPart: FC = () => {
  const onGetPreference = usePreference()
  const onGetWordsWithSemesters = useWordsWithSemesters()

  const onClickRefresh = useCallback(async () => {
    // run all together
    await Promise.all([onGetWordsWithSemesters(), onGetPreference()])
  }, [onGetWordsWithSemesters, onGetPreference])

  return <StyledCloudRefresher onClick={onClickRefresh} runOnClickOnce />
}

export default WordCardsFrameRefreshButtonPart
