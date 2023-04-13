import { FC, useCallback } from 'react'
import StyledCloudRefresher from '@/atoms/StyledCloudRefresher'
import { useSemesters } from '@/hooks/semesters/use-semesters.hook'
import { useWordIds } from '@/hooks/words/use-word-ids.hook'

const WordCardsFrameRefreshButton: FC = () => {
  const [, getWordIds] = useWordIds()
  const getSemesters = useSemesters()

  const onClickRefresh = useCallback(async () => {
    await Promise.allSettled([getWordIds(), getSemesters()])
  }, [getWordIds, getSemesters])

  return <StyledCloudRefresher onClick={onClickRefresh} runOnClickOnce />
}

export default WordCardsFrameRefreshButton
