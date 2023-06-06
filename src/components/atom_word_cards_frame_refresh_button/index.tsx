import { FC, useCallback } from 'react'
import StyledCloudRefresher from '@/atoms/StyledCloudRefresher'
import { useSemesters } from '@/hooks/semesters/use-semesters.hook'
import { useWordIds } from '@/hooks/words/use-word-ids.hook'

const WordCardsFrameRefreshButton: FC = () => {
  const [, getWordIds] = useWordIds()
  const getSemesters = useSemesters()

  const onClickRefresh = useCallback(async () => {
    const semesters = await getSemesters()
    if (!semesters.latestSemesterCode) return

    await getWordIds({ semester: semesters.latestSemesterCode })
  }, [getWordIds, getSemesters])

  return <StyledCloudRefresher onClick={onClickRefresh} runOnClickOnce />
}

export default WordCardsFrameRefreshButton
