import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC, Fragment, useCallback, useState } from 'react'
import DeleteWordIcon from '@mui/icons-material/Delete'
import { useDeleteWord } from '@/hooks/words/use-delete-word.hook'
import StyledTextButtonAtom from '@/atoms/StyledTextButton'
interface Props {
  wordId: string
}
const WordCardDeleteButtonPart: FC<Props> = ({ wordId }) => {
  const [isDoubleChecking, setDoubleChecking] = useState(false)
  const [isDeleting, onDeleteWord] = useDeleteWord(wordId)

  const onClick = useCallback(() => {
    setDoubleChecking(!isDoubleChecking)
  }, [isDoubleChecking])

  // TODO: Use memo
  const jsxElementButton = isDoubleChecking ? (
    <Fragment>
      <StyledTextButtonAtom title={`Delete!`} onClick={onDeleteWord} />
      <StyledTextButtonAtom title={`No!`} onClick={onClick} />
    </Fragment>
  ) : (
    <DeleteWordIcon />
  )

  return (
    <StyledIconButtonAtom
      isDisabled={isDeleting}
      onClick={onClick}
      jsxElementButton={jsxElementButton}
    />
  )
}

export default WordCardDeleteButtonPart
