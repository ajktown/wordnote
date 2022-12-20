import StyledIconButtonAtom from '@/atoms/StyledIconButton'
import { FC, useCallback } from 'react'
import DeleteWordIcon from '@mui/icons-material/Delete'
import { useDeleteWord } from '@/hooks/words/use-delete-word.hook'
interface Props {
  wordId: string
}
const WordCardDeleteButton: FC<Props> = ({ wordId }) => {
  const handleClickDeleteWord = useDeleteWord()

  const handleClickDeleteWordCallback = useCallback(async () => {
    handleClickDeleteWord(wordId)
  }, [wordId, handleClickDeleteWord])

  return (
    <StyledIconButtonAtom
      onClickCallback={handleClickDeleteWordCallback}
      jsxElementButton={<DeleteWordIcon />}
    />
  )
}

export default WordCardDeleteButton
