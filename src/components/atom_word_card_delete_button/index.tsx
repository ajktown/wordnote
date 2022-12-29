import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC } from 'react'
import DeleteWordIcon from '@mui/icons-material/Delete'
import { useDeleteWord } from '@/hooks/words/use-delete-word.hook'
interface Props {
  wordId: string
}
const WordCardDeleteButton: FC<Props> = ({ wordId }) => {
  const handleClickDeleteWord = useDeleteWord(wordId)

  return (
    <StyledIconButtonAtom
      onClick={handleClickDeleteWord}
      jsxElementButton={<DeleteWordIcon />}
    />
  )
}

export default WordCardDeleteButton
