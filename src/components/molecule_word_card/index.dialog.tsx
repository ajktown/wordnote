import { FC, useCallback } from 'react'
import StyledDialog from '@/organisms/StyledDialog'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import WordCard from '.'
import { selectedWordForDialogState } from '@/recoil/words.state'
import { usePutWordCache } from '@/hooks/words/use-put-word-cache.hook'
import { useWarning } from '@/hooks/use-warning.hook'

const WordCardDialog: FC = () => {
  const selectedWordId = useRecoilValue(selectedWordForDialogState)
  const resetSelectedWordForDialog = useResetRecoilState(
    selectedWordForDialogState,
  )
  const [, resetModify] = usePutWordCache(selectedWordId)

  const handleCloseDialog = useCallback(async () => {
    await resetModify()
    resetSelectedWordForDialog()
  }, [resetSelectedWordForDialog, resetModify])

  const [warningDialog, handleClick] = useWarning(handleCloseDialog)

  if (!selectedWordId) return null

  return (
    <StyledDialog onClose={handleClick}>
      <WordCard wordId={selectedWordId} editingMode />
      {warningDialog}
    </StyledDialog>
  )
}

export default WordCardDialog
