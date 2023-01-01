import StyledTextButtonAtom from '@/atoms/StyledTextButton'
import { FC } from 'react'

interface Props {
  wordId: string
}
const WordCardConfirmModifyButton: FC<Props>  = ({ wordId }) => {
  return (
    <StyledTextButtonAtom
      title="Modify"
      variant='text'
    />
  )
}

export default WordCardConfirmModifyButton