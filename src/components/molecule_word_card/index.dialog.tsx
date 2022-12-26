import { FC } from 'react'
import StyledDialog from '@/organisms/StyledDialog'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import WordCard from '.'
import { selectedWordIdForDialogState } from '@/recoil/words.state'

const WordCardDialog: FC = () => {
  const selectedWordId = useRecoilValue(selectedWordIdForDialogState)
  const closeDialog = useResetRecoilState(selectedWordIdForDialogState)

  if (!selectedWordId) return null

  return (
    <StyledDialog onClose={closeDialog}>
      <WordCard wordId={selectedWordId} editingMode />
    </StyledDialog>
  )
}

export default WordCardDialog
