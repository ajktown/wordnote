import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import { useResetRecoilState } from 'recoil'
import RefreshIcon from '@mui/icons-material/Refresh'
import { wordIdsState } from '@/recoil/words.state'

const WordCardsFrameRefreshButton: FC = () => {
  const resetWordIds = useResetRecoilState(wordIdsState)

  const handleReset = () => {
    resetWordIds()
  }
  return (
    <StyledIconButtonAtom
      handleClick={() => handleReset()}
      jsxElementButton={<RefreshIcon />}
    />
  )
}

export default WordCardsFrameRefreshButton
