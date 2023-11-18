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

  /**
   * Sync words with the API Server. If selectedSemester is undefined,
   * the API will understand and return the latest semester.
   */
  const onGetWordsSync = useCallback(async () => {
    const semesters = await getSemesters()
    if (!semesters.latestSemesterCode) return // User has never created word even once.

    await getWords({ semester: selectedSemester })
  }, [selectedSemester, getSemesters, getWords])

  const onClickRefresh = useCallback(async () => {
    // run all together
    await Promise.all([onGetWordsSync(), getPreference()])
  }, [onGetWordsSync, getPreference])

  return <StyledCloudRefresher onClick={onClickRefresh} runOnClickOnce />
}

export default WordCardsFrameRefreshButtonPart
