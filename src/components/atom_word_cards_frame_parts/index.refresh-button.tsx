import { FC, useCallback } from 'react'
import StyledCloudRefresher from '@/atoms/StyledCloudRefresher'
import { useSemesters } from '@/hooks/semesters/use-semesters.hook'
import { useWords } from '@/hooks/words/use-words.hook'
import { usePreference } from '@/hooks/preference/use-preference.hook'

const WordCardsFrameRefreshButtonPart: FC = () => {
  const [, getWords] = useWords()
  const getSemesters = useSemesters()
  const getPreference = usePreference()

  const onClickRefresh = useCallback(async () => {
    const semesters = await getSemesters()
    if (!semesters.latestSemesterCode) return

    await getWords({ semester: semesters.latestSemesterCode })

    await getPreference()
  }, [getWords, getSemesters, getPreference])

  return <StyledCloudRefresher onClick={onClickRefresh} runOnClickOnce />
}

export default WordCardsFrameRefreshButtonPart
