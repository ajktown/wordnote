import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useWords } from '@/hooks/words/use-words.hook'

const WordCardsFrameRefreshButton: FC = () => {
  const handleClickRefreshWords = useWords()

  return (
    <StyledIconButtonAtom
      handleClick={() => handleClickRefreshWords()}
      jsxElementButton={<RefreshIcon />}
    />
  )
}

export default WordCardsFrameRefreshButton
