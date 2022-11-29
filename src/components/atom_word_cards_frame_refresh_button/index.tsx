import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { wordIdsState } from '@/recoils/state_atoms/words.state'
import { FC } from 'react'
import { useResetRecoilState } from 'recoil'
import RefreshIcon from '@mui/icons-material/Refresh'

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
