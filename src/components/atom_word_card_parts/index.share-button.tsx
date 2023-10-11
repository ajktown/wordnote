import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC, useCallback } from 'react'
import ShareIcon from '@mui/icons-material/Share'
interface Props {
  wordId: string
}
const WordCardShareButtonPart: FC<Props> = ({ wordId }) => {
  const onClick = useCallback(
    () => console.log(`TODO: Write a real onClick() for word ` + wordId),
    [wordId],
  )

  return (
    <StyledIconButtonAtom onClick={onClick} jsxElementButton={<ShareIcon />} />
  )
}

export default WordCardShareButtonPart
