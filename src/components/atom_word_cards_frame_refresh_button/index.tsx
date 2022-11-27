import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { wordsState } from '@/recoils/state_atoms/words.state'
import { FC } from 'react'
import { useResetRecoilState } from 'recoil'
import RefreshIcon from '@mui/icons-material/Refresh'

const WordCardsFrameRefreshButton: FC  = () => {
  const resetWords = useResetRecoilState(wordsState)

  return (
    <StyledIconButtonAtom
      handleClick={() => resetWords()}
      jsxElementButton={<RefreshIcon />}
    />
  )
}

export default WordCardsFrameRefreshButton