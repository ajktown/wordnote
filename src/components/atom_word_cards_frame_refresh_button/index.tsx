import { FC } from 'react'
import { useWords } from '@/hooks/words/use-words.hook'
import StyledCloudRefresher from '@/atoms/StyledCloudRefresher'

const WordCardsFrameRefreshButton: FC = () => {
  const handleClickRefreshWords = useWords()

  return <StyledCloudRefresher onClickCallback={handleClickRefreshWords} />
}

export default WordCardsFrameRefreshButton
