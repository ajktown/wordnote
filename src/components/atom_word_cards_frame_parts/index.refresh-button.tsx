import { FC, useCallback } from 'react'
import StyledCloudRefresher from '@/atoms/StyledCloudRefresher'
import { useSemesters } from '@/hooks/semesters/use-semesters.hook'
import { useWords } from '@/hooks/words/use-words.hook'
import { usePreference } from '@/hooks/preference/use-preference.hook'
import { useRecoilValue } from 'recoil'
import { selectedSemesterSelector } from '@/recoil/words/words.selectors'

const WordCardsFrameRefreshButtonPart: FC = () => {
  const [, getWords] = useWords()
  const getSemesters = useSemesters()
  const getPreference = usePreference()
  const selectedSemester = useRecoilValue(selectedSemesterSelector)

  const onClickRefresh = useCallback(async () => {
    const semesters = await getSemesters()
    if (!semesters.latestSemesterCode) return

    await getWords({ semester: selectedSemester })

    await getPreference()
  }, [getWords, getSemesters, getPreference, selectedSemester])

  return <StyledCloudRefresher onClick={onClickRefresh} runOnClickOnce />
}

export default WordCardsFrameRefreshButtonPart
