import { FC } from 'react'
import StyledDialog from '@/organisms/StyledDialog'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import WordCard from '.'
import { selectedWordForDialogState } from '@/recoil/words.state'

const WordCardDialog: FC = () => {
  const selectedWordId = useRecoilValue(selectedWordForDialogState)
  const handleCloseDialog = useResetRecoilState(selectedWordForDialogState)

  if (!selectedWordId) return null

  return (
    <StyledDialog onClose={handleCloseDialog}>
      <WordCard wordId={selectedWordId} editingMode />
    </StyledDialog>
  )
}

export default WordCardDialog
