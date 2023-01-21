import { FC, useCallback } from 'react'
import { useWords } from '@/hooks/words/use-words.hook'
import StyledCloudRefresher from '@/atoms/StyledCloudRefresher'
import { useSemesters } from '@/hooks/semesters/use-semesters.hook'

const WordCardsFrameRefreshButton: FC = () => {
  const getWords = useWords()
  const getSemesters = useSemesters()

  const onClickRefresh = useCallback(async () => {
    await Promise.allSettled([getWords(), getSemesters()])
  }, [getWords, getSemesters])

  return <StyledCloudRefresher onClick={onClickRefresh} runOnClickOnce />
}

export default WordCardsFrameRefreshButton
