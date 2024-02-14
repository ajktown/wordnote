import { FC, useCallback } from 'react'
import StyledCloudRefresher from '@/atoms/StyledCloudRefresher'
import { usePreference } from '@/hooks/preference/use-preference.hook'
import { useWordsWithSemesters } from '@/hooks/words/use-words-with-semesters.hook'
import { useActionGroups } from '@/hooks/action-groups/use-action-groups.hook'

const WordCardsFrameRefreshButtonPart: FC = () => {
  const onGetPreference = usePreference()
  const onGetWordsWithSemesters = useWordsWithSemesters()
  const onGetActionGroups = useActionGroups()

  const onClickRefresh = useCallback(async () => {
    // run all together
    await Promise.all([
      onGetWordsWithSemesters(),
      onGetPreference(),
      onGetActionGroups(),
    ])
  }, [onGetWordsWithSemesters, onGetPreference, onGetActionGroups])

  return <StyledCloudRefresher onClick={onClickRefresh} runOnClickOnce />
}

export default WordCardsFrameRefreshButtonPart
