import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import DeleteWordIcon from '@mui/icons-material/Delete'
import { useDeleteWord } from '@/hooks/words/use-delete-word.hook'
interface Props {
  wordId: string
}
const WordCardDeleteButtonPart: FC<Props> = ({ wordId }) => {
  const [isDeleting, onDeleteWord] = useDeleteWord(wordId)

  return (
    <StyledIconButtonAtom
      isDisabled={isDeleting}
      onClick={onDeleteWord}
      jsxElementButton={<DeleteWordIcon />}
    />
  )
}

export default WordCardDeleteButtonPart
