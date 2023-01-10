import { FC, useCallback } from 'react'
import { useWords } from '@/hooks/words/use-words.hook'
import StyledCloudRefresher from '@/atoms/StyledCloudRefresher'
import { useSemesters } from '@/hooks/semesters/use-semesters.hook'

const WordCardsFrameRefreshButton: FC = () => {
  const getWords = useWords()
  const getSemesters = useSemesters()

  const handleClickRefresh = useCallback(async () => {
    await Promise.allSettled([getWords(), getSemesters()])
  }, [getWords, getSemesters])

  return <StyledCloudRefresher onClick={handleClickRefresh} runOnClickOnce />
}

export default WordCardsFrameRefreshButton
