import { FC, useCallback } from 'react'
import StyledDialog from '@/organisms/StyledDialog'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import WordCard from '.'
import { selectedWordForDialogState } from '@/recoil/words.state'
import { usePutWordCache } from '@/hooks/words/use-put-word-cache.hook'
import { useWarning } from '@/hooks/use-warning.hook'

// TODO: I think the warning dialog should be imported here.

const WordCardDialog: FC = () => {
  const selectedWordId = useRecoilValue(selectedWordForDialogState)
  const handleCloseWordEditingDialog = useResetRecoilState(
    selectedWordForDialogState,
  )
  const [, handleResetCache, isModified] = usePutWordCache(selectedWordId)
  const isWarningDisabled = useCallback(
    async () => !(await isModified()),
    [isModified],
  )

  const handleCloseDialog = useCallback(async () => {
    await handleResetCache()
    handleCloseWordEditingDialog()
  }, [handleCloseWordEditingDialog, handleResetCache])

  const [warningDialog, handleClick] = useWarning(
    handleCloseDialog,
    isWarningDisabled,
  )

  if (!selectedWordId) return null

  return (
    <StyledDialog onClose={handleClick}>
      <WordCard wordId={selectedWordId} editingMode />
      {warningDialog}
    </StyledDialog>
  )
}

export default WordCardDialog
