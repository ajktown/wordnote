import { FC } from 'react'
import StyledDialog from '@/organisms/StyledDialog'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import WordCard from '.'
import { selectedWordForDialogState } from '@/recoil/words.state'

const WordCardDialog: FC = () => {
  const selectedWord = useRecoilValue(selectedWordForDialogState)
  const handleCloseDialog = useResetRecoilState(selectedWordForDialogState)

  if (!selectedWord) return null

  return (
    <StyledDialog onClose={handleCloseDialog}>
      <WordCard wordId={selectedWord.id} editingMode />
    </StyledDialog>
  )
}

export default WordCardDialog
