import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { FC } from 'react'

interface Props {
  wordId: string
}
const SharedWordCardAddWordButtonPart: FC<Props> = ({ wordId }) => {
  return (
    <StyledTextButtonAtom title={`Add this word into your list` + wordId} />
  )
}

export default SharedWordCardAddWordButtonPart
