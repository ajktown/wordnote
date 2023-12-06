import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import ShareIcon from '@mui/icons-material/Share'
import { useRecoilCallback } from 'recoil'
import { sharedWordIdState } from '@/recoil/shared-resource/shared-resource.state'
interface Props {
  wordId: string
}
const WordCardShareButtonPart: FC<Props> = ({ wordId }) => {
  const onClick = useRecoilCallback(
    ({ set }) =>
      () => {
        set(sharedWordIdState, wordId)
      },
    [wordId],
  )

  return (
    <StyledIconButtonAtom onClick={onClick} jsxElementButton={<ShareIcon />} />
  )
}

export default WordCardShareButtonPart
